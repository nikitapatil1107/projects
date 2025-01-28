package com.cybage.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.CompanyInfoModel;

public interface CompanyDetailsRepository extends JpaRepository<CompanyInfoModel, Integer> {

}
