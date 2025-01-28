package com.cybage.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.ChangePasswordDTO;
import com.cybage.boot.dto.RegisterCompanyDTO;
import com.cybage.boot.dto.RegisterUserDTO;
import com.cybage.boot.services.DomainService;
import com.cybage.boot.services.EmployerService;
import com.cybage.boot.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterController {
	@Autowired 
	private UserService userService;
	
	@Autowired
	private DomainService domainService;
	
	@Autowired 
	private EmployerService employerService;
	
	@PostMapping(path = "/employee/registerUser")
	public ResponseEntity<?> registerUser(@RequestBody RegisterUserDTO registerUserDto) {
		return userService.registerUserData(registerUserDto);
	}
	
	@GetMapping(path = "/employer/checkDomain")
    public ResponseEntity<Boolean> checkDomain(@RequestParam("domainName") String domainName) {
        boolean isDomainPresent = domainService.isDomainPresent(domainName);
        return new ResponseEntity<>(isDomainPresent, HttpStatus.OK);
    }
	
	@PostMapping(path = "/employer/registerCompany")
	public ResponseEntity<?> registerCompany(@RequestBody RegisterCompanyDTO registerCompanyDto) {
		return employerService.registerCompanyData(registerCompanyDto);
	}
	
	@PostMapping(path = "/employee/changeUserPassword")
	public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordDTO changeCredentials) {
		String userEmail = changeCredentials.getUserEmail();
		String userPassword = changeCredentials.getUserPassword();
		String newPassword = changeCredentials.getNewPassword();
		
		boolean resetSuccessful = userService.changePassword(userEmail, userPassword, newPassword);
		if (resetSuccessful) {
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
	}
}
