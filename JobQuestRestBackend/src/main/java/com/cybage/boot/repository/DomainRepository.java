package com.cybage.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.dto.RegisterCompanyDTO;
import com.cybage.boot.models.DomainModel;
import com.cybage.boot.models.UserProfileModel;

public interface DomainRepository extends JpaRepository<DomainModel, Integer> {
	 DomainModel findByDomainName(String domainName);
}
