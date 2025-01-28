package com.cybage.boot.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "jobDetails")
public class JobDetailInfoModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	private boolean isJobActive;

	@ManyToOne
	@JoinColumn(name = "compId")
	@JsonIgnore
	private CompanyInfoModel compId;
}