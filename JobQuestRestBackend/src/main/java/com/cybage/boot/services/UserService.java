package com.cybage.boot.services;
import java.util.List;
import java.util.Objects;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.RegisterUserDTO;
import com.cybage.boot.models.UserProfileModel;
import com.cybage.boot.repository.UserRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private EmailService emailService;
	
	public ResponseEntity<?> registerUserData(RegisterUserDTO registerUserDto) {
		
		if (Objects.isNull(registerUserDto) || Objects.isNull(registerUserDto.getUserEmail()) || Objects.isNull(registerUserDto.getUserPassword())) {
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.BAD_REQUEST);
        }
		
        String userEmail = registerUserDto.getUserEmail();
        
        if (userExists(userEmail)) {
            return new ResponseEntity<>("User with email " + userEmail + " already exists.", HttpStatus.BAD_REQUEST);
        }
        
        UserProfileModel userProfile = modelMapper.map(registerUserDto, UserProfileModel.class);
        String hashedPassword = passwordEncoder.encode(userProfile.getUserPassword());
        userProfile.setUserPassword(hashedPassword);
        userProfile = userRepository.save(userProfile);
        return new ResponseEntity<>(modelMapper.map(userProfile, RegisterUserDTO.class), HttpStatus.CREATED);
    }
	
	public RegisterUserDTO authenticateUser(String userEmail, String userPassword) {
        UserProfileModel user = userRepository.findByUserEmail(userEmail);
        if (user != null && passwordEncoder.matches(userPassword, user.getUserPassword())) {
            return modelMapper.map(user, RegisterUserDTO.class);
        }
        return null; 
    }
	
	public boolean userExists(String userEmail) {
        return userRepository.existsByUserEmail(userEmail);
    }
	
	public boolean changePassword(String userEmail, String userPassword, String newPassword) {
		UserProfileModel user = userRepository.findByUserEmail(userEmail);
        if (user != null && passwordEncoder.matches(userPassword, user.getUserPassword())) {
        	return emailService.resetPassword(userEmail, newPassword);
        }
        
        return false;
	}
}
