package com.cybage.boot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginCompanyDTO {
	private int compId;
	private String compEmail;
	private String compPassword;
	public String getCompEmail() {
		return compEmail;
	}
	public void setCompEmail(String compEmail) {
		this.compEmail = compEmail;
	}
	public String getCompPassword() {
		return compPassword;
	}
	public void setCompPassword(String compPassword) {
		this.compPassword = compPassword;
	}
	
	
}
