package com.cybage.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.UserBasicInfoDTO;
import com.cybage.boot.dto.UserDTO;
import com.cybage.boot.models.UserEducation;
import com.cybage.boot.models.UserProfileModel;
import com.cybage.boot.models.UserWorkExperience;
import com.cybage.boot.services.ProflieService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {

	@Autowired
	private ProflieService profileService;

	@GetMapping(path = "/getUserProfile")
	public ResponseEntity<UserDTO> getUserDataById(@RequestParam("userId") int userId) {
		return new ResponseEntity<>(profileService.getUserInfoById(userId), HttpStatus.OK);
	}

	@PutMapping(path = "/saveBasicUserInfo")
	public ResponseEntity<UserProfileModel> saveBasicUserInfo(@RequestParam("userId") int userId,
			@RequestBody UserProfileModel userBasicInfoDTO) {
		return new ResponseEntity<>(profileService.saveBasicUserInfo(userId, userBasicInfoDTO), HttpStatus.OK);
	}

	@PutMapping(path = "/saveSocialInfoUser")
	public ResponseEntity<UserProfileModel> saveSocialProfileInfo(@RequestParam("userId") int userId,
			@RequestBody UserProfileModel userSocialProfile) {
		return new ResponseEntity<>(profileService.saveUserSocialProfile(userId, userSocialProfile), HttpStatus.OK);
	}

	@PutMapping(path = "/saveSelectedSkills")
	public ResponseEntity<UserProfileModel> saveSelectedSkillsInfo(@RequestParam("userId") int userId,
			@RequestBody UserProfileModel userSelectedSkills) {
		return new ResponseEntity<>(profileService.saveYourSelectedSkillsOfUser(userId, userSelectedSkills),
				HttpStatus.OK);
	}

	@PostMapping(path = "/saveWorkExperienceUser")
	public ResponseEntity<UserWorkExperience> saveUserWorkExperience(@RequestBody UserWorkExperience userWorkExp) {
		return new ResponseEntity<>(profileService.saveUserWorkExperience(userWorkExp), HttpStatus.CREATED);
	}

	@PostMapping(path = "/saveUserEducation")
	public ResponseEntity<UserEducation> saveUserEducation(@RequestBody UserEducation userEducation) {
		return new ResponseEntity<>(profileService.saveUserEducation(userEducation), HttpStatus.CREATED);
	}

	@DeleteMapping(path = "/deleteWorkExpOfUser")
	public ResponseEntity<String> deleteWorkExpOfUser(@RequestParam("workExpId") int workExpId) {
		profileService.deleteWorkExp(workExpId);
		return new ResponseEntity<>("User Work Experience Deleted", HttpStatus.OK);
	}

	@DeleteMapping(path = "/deleteUserEducation")
	public ResponseEntity<String> deleteUserEducation(@RequestParam("eduId") int eduId) {
		profileService.deleteUserEducation(eduId);
		return new ResponseEntity<>("User Education Deleted", HttpStatus.OK);
	}

}
