package com.cybage.boot.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "userEducation")
@AllArgsConstructor
@NoArgsConstructor
public class UserEducationModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int userEduId;
	private String collegeName;
	private int graduationYear;
	private String degreeMajor;
	private float gpaScore;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserProfileModel user_id; // Name must Match with MappedBy Value
	// private int user_id; // FOREIGN KEY
}
