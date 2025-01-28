package com.cybage.boot.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "userEducation")
@AllArgsConstructor
@NoArgsConstructor
public class UserEducation {
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