package com.cybage.boot.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name="EventInfo")
@AllArgsConstructor
@NoArgsConstructor
public class EventInfoModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
