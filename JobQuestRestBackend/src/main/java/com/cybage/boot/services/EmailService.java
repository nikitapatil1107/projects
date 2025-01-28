package com.cybage.boot.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cybage.boot.algorithm.SendEmail;
import com.cybage.boot.models.UserProfileModel;
import com.cybage.boot.repository.UserRepository;

@Service
public class EmailService {
	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private UserRepository userRepository;

	private SendEmail sendEmail = new SendEmail();

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final int OTP_LENGTH = 6;

	public boolean sendOTP(String email, String userOtp) {
		boolean userExist = userRepository.existsByUserEmail(email);
		if (userExist) {
			return sendEmail.sendOtpEmail(email, Integer.parseInt(userOtp));
		} else {
			return false;
		}
	}

	public boolean sendAcceptEmail(String email, String jobName) {
		UserProfileModel existingCustomer = userRepository.findByUserEmail(email);

		String subject = "Your Resume has been Accepted for " + jobName;
		String message = "Dear " + existingCustomer.getUserName()
				+ "\n\nWe are delighted to inform you that your resume has been accepted for the position of " + jobName
				+ ". Your qualifications and experience align closely with our requirements, and we believe you would be a valuable addition to our team.\n\nWe will contact you shortly to schedule an interview. Please be prepared to discuss your experience, skills, and suitability for the role.\n\nIf you have any questions or need further assistance, please do not hesitate to contact us\n\n\n\n\n";

		boolean userExist = userRepository.existsByUserEmail(email);
		if (userExist) {
			return sendEmail.sendAccpetRejectEmail(email, subject, message);
		} else {
			return false;
		}
	}

	public boolean sendRejectEmail(String email, String jobName) {
		UserProfileModel existingCustomer = userRepository.findByUserEmail(email);

		String subject = "Update on Your Job Application for " + jobName;
		String message = "Dear " + existingCustomer.getUserName()
				+ "\n\nThank you for your interest in the position of " + jobName
				+ ". We appreciate the time and effort you invested in the application process.\n\nAfter careful consideration, we regret to inform you that we have decided not to move forward with your application at this time. While your qualifications and experience are impressive, we have identified candidates whose profiles better match our current needs.\n\nIf you have any questions or need further assistance, please do not hesitate to contact us\n\n\n\n\n";

		boolean userExist = userRepository.existsByUserEmail(email);
		if (userExist) {
			return sendEmail.sendAccpetRejectEmail(email, subject, message);
		} else {
			return false;
		}
	}

	public boolean sendEmail(String to, String subject, String body) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom("Evolvingsols.com");
			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);
			mailSender.send(message);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public String generateOTP() {
		Random random = new Random();
		StringBuilder otp = new StringBuilder();
		for (int i = 0; i < OTP_LENGTH; i++) {
			otp.append(random.nextInt(10));
		}
		return otp.toString();
	}

	public boolean resetPassword(String userEmail, String newPassword) {
		UserProfileModel user = userRepository.findByUserEmail(userEmail);
		if (user != null) {
			String hashedPassword = passwordEncoder.encode(newPassword);
			user.setUserPassword(hashedPassword);
			userRepository.save(user);
			return true;
		}
		return false;
	}

	public boolean verifyOTP(String email, String userOtp, String generatedOtp) {
		return userOtp.equals(generatedOtp);
	}
}
