package com.cybage.boot.dto;

import java.util.List;

import com.cybage.boot.models.JobDetailInfoModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {
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
	private List<JobDetailInfoModel> jobs;
}
