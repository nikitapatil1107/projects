package com.cybage.boot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.repository.CompanyDetailsRepository;

@Service
public class CompanyDetailsService {
	@Autowired
	private CompanyDetailsRepository companyDetailsRepository;
	
	public CompanyInfoModel getCompanyInfo(int companyId)
	{
		return companyDetailsRepository.findById(companyId).orElse(null);
	}
	
	public CompanyInfoModel saveCompanyInfo(CompanyInfoModel companyInfoModel) {
        // Save or update the company details in the database
        return companyDetailsRepository.save(companyInfoModel);
    }
}
