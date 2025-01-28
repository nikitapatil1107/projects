package com.cybage.boot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "domain")
public class DomainModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int domainId;
	private String domainName;
}
