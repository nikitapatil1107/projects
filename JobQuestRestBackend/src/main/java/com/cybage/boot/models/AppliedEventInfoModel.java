package com.cybage.boot.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "applied_event_table")
public class AppliedEventInfoModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int applId;
	private int custId;
	private int eventId;
}
