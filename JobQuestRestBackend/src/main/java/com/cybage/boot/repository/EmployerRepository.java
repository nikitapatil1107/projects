package com.cybage.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.dto.RegisterCompanyDTO;
import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.models.UserProfileModel;

public interface EmployerRepository extends JpaRepository<CompanyInfoModel, Integer>{
	CompanyInfoModel findByCompEmail(String companyEmail);
}
