package com.cybage.boot.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "CompanyInfo")
public class CompanyInfoModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int compId;
	private String compName;
	private String compEmail;
	private String compPassword;
	private String compContactName;
	private String compContactNo;
	private String compDesc;
	private String tag1;
	private String tag2;
	private String tag3;
	private String tag4;
	private String compVideoUrl;
	private String compTagLine;
	private String compWebsiteUrl;
	private String foundedAt;
	private String compType;
	private String compHeadquaters;
	private double compRating;
	private String noOfFollower;
	private String compBannerImg;
	private String compPosterImg;

	@OneToMany(mappedBy = "compId", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<JobDetailInfoModel> jobs;
	
}