package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.CompanyInfoModel;


public interface CompanySearchRepository extends JpaRepository<CompanyInfoModel, Integer>{
	List<CompanyInfoModel> findByCompNameContaining(String searchText);
}
