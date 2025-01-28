package com.cybage.boot.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "userWorkExperience")
@AllArgsConstructor
@NoArgsConstructor
public class UserWorkExperience {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int workExpId;
	private String companyName;
	private String titleName;
	private String startDate;
	private String endDate;
	private String workDescription;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserProfileModel user_id; // Name must Match with MappedBy Value
	// private int user_id; // FOREIGN KEY
}
