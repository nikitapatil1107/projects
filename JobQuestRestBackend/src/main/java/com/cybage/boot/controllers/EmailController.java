package com.cybage.boot.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.RegisterUserDTO;
import com.cybage.boot.services.EmailService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {

	@Autowired
	private EmailService emailService;

	private Map<String, String> otpMap = new HashMap<>();

	@RequestMapping(value = "/sendOtp")
	public ResponseEntity<Boolean> sendOTP(@RequestParam("userEmail") String userEmail, HttpSession session) {

		String otp = emailService.generateOTP();
		
		boolean otpSent = emailService.sendOTP(userEmail, otp);

		if (otpSent) {
			otpMap.put(userEmail, otp);
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
	}

	@GetMapping(value = "/sendAcceptEmail")
	public ResponseEntity<Boolean> sendAcceptEmail(@RequestParam("userEmail") String userEmail,
			@RequestParam("jobName") String jobName) {
		boolean emailSent = emailService.sendAcceptEmail(userEmail, jobName);

		if (emailSent) {
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
	}

	@GetMapping(value = "/sendRejectEmail")
	public ResponseEntity<Boolean> sendRejectEmail(@RequestParam("userEmail") String userEmail,
			@RequestParam("jobName") String jobName) {

		boolean emailSent = emailService.sendRejectEmail(userEmail, jobName);

		if (emailSent) {
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
	}

	@RequestMapping(value = "/verifyOtp")
	public ResponseEntity<Boolean> verifyOTP(@RequestParam("userOTP") String userOTP,
			@RequestParam("userEmail") String userEmail, HttpSession session) {

		// Retrieve stored OTP from session
		String generatedOTP = otpMap.get(userEmail); // Retrieve OTP corresponding to the email

		if (generatedOTP != null && generatedOTP.equals(userOTP)) {
			otpMap.remove(userEmail); // Remove the OTP from the map after verification
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
	}

	@PostMapping(value = "/resetPassword")
	public ResponseEntity<Boolean> resetPassword(@RequestBody RegisterUserDTO resetCredentials) {
		String userEmail = resetCredentials.getUserEmail();
		String userPassword = resetCredentials.getUserPassword();

		boolean resetSuccessful = emailService.resetPassword(userEmail, userPassword);
		if (resetSuccessful) {
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
	}
}
