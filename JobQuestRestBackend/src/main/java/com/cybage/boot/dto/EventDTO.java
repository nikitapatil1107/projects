package com.cybage.boot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
	private int eventId;
	private String eventName;
	private String posterImage;
	private String bannerImage;
	private String organizerName;
	private String tech;
	private String dateTime;
	private int noOfRegistration;
	private String aboutContest;
	private String rulesToFollow;
	private String rewards;
	private String aboutQrganizer;
	private double rating;
	private String contactDetails;
	private String founder;
	private String companySize;
	private String industryType;
}
