package com.cybage.boot.dto;

import java.util.List;

import com.cybage.boot.models.UserEducationModel;
import com.cybage.boot.models.UserWorkExperience;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppliedJobUserDTO {
	private int id;
	private String userName;
	private String userEmail;
	private String userPassword;
	private String userContactNo;
	private boolean workStatus;
	private String userLocation;
	private String primaryRole;
	private int yearsOfExpInPrimaryRole;
	private String openToFollowingRoles;
	private String userBio;
	private String userGender;
	private String websiteUrl;
	private String linkedInUrl;
	private String githubUrl;
	private String twitterUrl;
	private String userSkills;
	private String userOTP;
	private String jobName;
	private int jobId;
	private boolean isJobDataActive;
	
	List<UserWorkExperience> workExpList;
	List<UserEducationModel> userEducationList;
}
