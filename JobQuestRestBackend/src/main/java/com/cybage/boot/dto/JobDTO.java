package com.cybage.boot.dto;

import com.cybage.boot.models.CompanyInfoModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {
	private int jobId;
	private String jobName;
	private String expReq;
	private String location;
	private String postedAgo;
	private int noOfApplicant;
	private String jobDesc;
	private String role;
	private String industryType;
	private String department;
	private String empType;
	private String roleCategory;
	private String education;
	private String keySkills;
	private double salRangeMin;
	private double salRangeMax;
	private String workMode;
	private String compType;
	private CompanyInfoModel compId;
	private boolean isJobActive;
}
