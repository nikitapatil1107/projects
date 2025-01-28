package com.cybage.boot.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCompanyDTO {
	private int compId;
	@NotEmpty(message = "User Name cannot be empty!!!")
	private String compName;
	private String compEmail;
	private String compPassword;
	private String compContactName;
	private String compContactNo;
	
}
