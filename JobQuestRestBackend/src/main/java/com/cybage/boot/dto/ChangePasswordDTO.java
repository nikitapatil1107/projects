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
public class ChangePasswordDTO {
	private String userEmail;
	private String userPassword;
	private String newPassword;
}