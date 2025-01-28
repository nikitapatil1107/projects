package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.CompanyInfoModel;

public interface CompanyRepository extends JpaRepository<CompanyInfoModel, Integer> {
	List<CompanyInfoModel> findByTag1OrTag2OrTag3OrTag4(String tag1, String tag2, String tag3, String tag4);
}
