package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.models.EventInfoModel;

public interface EventSearchRepository extends JpaRepository<EventInfoModel, Integer> {
	List<EventInfoModel> findByeventNameContaining(String searchText);
}
