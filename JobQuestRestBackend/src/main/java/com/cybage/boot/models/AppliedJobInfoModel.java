package com.cybage.boot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "AppliedJobDetails")
public class AppliedJobInfoModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int appliedJobId;
	private int id;
	private int jobId;
	private int compId;
	private String jobName;
	private Boolean isJobRejected;
	
}
