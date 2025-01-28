package com.cybage.boot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "SavedJobsDetails")
public class SavedJobsInfoModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int savedJobId;
	private int userId;
	private int jobId;
}
