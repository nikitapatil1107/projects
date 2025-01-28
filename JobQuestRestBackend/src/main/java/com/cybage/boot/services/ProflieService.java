package com.cybage.boot.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.UserDTO;
import com.cybage.boot.models.UserEducation;
import com.cybage.boot.models.UserProfileModel;
import com.cybage.boot.models.UserWorkExperience;
import com.cybage.boot.repository.UserEducationRepository;
import com.cybage.boot.repository.UserRepository;
import com.cybage.boot.repository.UserWorkExpRepository;

@Service
public class ProflieService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserWorkExpRepository workExpRepository;

	@Autowired
	private UserEducationRepository userEducationRepository;

	@Autowired
	private ModelMapper modelMapper;

	public UserDTO getUserInfoById(int userId) {
		UserProfileModel userProfile = userRepository.findById(userId).get();
		return modelMapper.map(userProfile, UserDTO.class);
	}

	public UserProfileModel saveBasicUserInfo(int userId, UserProfileModel userBasicInfo) {
		UserProfileModel userProfile = userRepository.findById(userId).get();
		if (userProfile != null) {
			userProfile.setUserName(userBasicInfo.getUserName());
			userProfile.setUserContactNo(userBasicInfo.getUserContactNo());
			userProfile.setUserLocation(userBasicInfo.getUserLocation());
			userProfile.setPrimaryRole(userBasicInfo.getPrimaryRole());
			userProfile.setYearsOfExpInPrimaryRole(userBasicInfo.getYearsOfExpInPrimaryRole());
			userProfile.setUserBio(userBasicInfo.getUserBio());
			userProfile.setOpenToFollowingRoles(userBasicInfo.getOpenToFollowingRoles());

			userRepository.save(userProfile);
			return userProfile;
		}
		return null;
	}

	public UserProfileModel saveUserSocialProfile(int userId, UserProfileModel userSocialData) {
		UserProfileModel userProfile = userRepository.findById(userId).get();
		if (userProfile != null) {
			userProfile.setWebsiteUrl(userSocialData.getWebsiteUrl());
			userProfile.setLinkedInUrl(userSocialData.getLinkedInUrl());
			userProfile.setGithubUrl(userSocialData.getGithubUrl());
			userProfile.setTwitterUrl(userSocialData.getTwitterUrl());

			userRepository.save(userProfile);
			return userProfile;
		}
		return null;
	}

	public UserProfileModel saveYourSelectedSkillsOfUser(int userId, UserProfileModel userSelectedSkills) {
		UserProfileModel userProfile = userRepository.findById(userId).get();
		if (userProfile != null) {
			userProfile.setUserSkills(userSelectedSkills.getUserSkills());

			userRepository.save(userProfile);
			return userProfile;
		}
		return null;
	}

	public UserWorkExperience saveUserWorkExperience(UserWorkExperience userWorkExperience) {
		return workExpRepository.save(userWorkExperience);
	}

	public UserEducation saveUserEducation(UserEducation userEducation) {
		return userEducationRepository.save(userEducation);
	}

	public void deleteWorkExp(int workExpId) {
		workExpRepository.deleteById(workExpId);
	}

	public void deleteUserEducation(int userEduId) {
		userEducationRepository.deleteById(userEduId);
	}
}
