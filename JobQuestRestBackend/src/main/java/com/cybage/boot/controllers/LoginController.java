package com.cybage.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.LoginCompanyDTO;
import com.cybage.boot.dto.LoginUserDTO;
import com.cybage.boot.dto.RegisterUserDTO;
import com.cybage.boot.services.EmployerService;
import com.cybage.boot.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {
	@Autowired 
	private UserService userService;
	
	@Autowired
	private EmployerService employerService;
	
	@PostMapping(value = "/employee/loginUser")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserDTO loginUserDto) {
        String userEmail = loginUserDto.getUserEmail();
        String userPassword = loginUserDto.getUserPassword();
        
        if (!userService.userExists(userEmail)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User with email " + userEmail + " does not exist.");
        }
        
        RegisterUserDTO loggedInUser = userService.authenticateUser(userEmail, userPassword);
       
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
        
        return ResponseEntity.ok(loggedInUser);
    }
	
	@PostMapping(value = "/employer/loginCompany")
    public ResponseEntity<?> loginCompany(@RequestBody LoginCompanyDTO loginCompanyDto) {
        return employerService.loginCompanyData(loginCompanyDto);
    }
}
