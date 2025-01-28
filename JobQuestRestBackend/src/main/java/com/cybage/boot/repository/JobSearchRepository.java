package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.cybage.boot.models.JobDetailInfoModel;


public interface JobSearchRepository extends JpaRepository<JobDetailInfoModel, Integer>  {
	List<JobDetailInfoModel> findByJobNameContaining(String searchText);
}
