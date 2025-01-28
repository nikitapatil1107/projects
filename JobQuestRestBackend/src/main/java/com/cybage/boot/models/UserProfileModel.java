package com.cybage.boot.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "userTable")
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	
	@JsonIgnore
	@OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL, orphanRemoval = true)
	List<UserWorkExperience> workExpList;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL, orphanRemoval = true )
	List<UserEducationModel> userEducationList;
}