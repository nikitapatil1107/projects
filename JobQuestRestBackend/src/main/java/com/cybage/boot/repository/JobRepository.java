package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.models.JobDetailInfoModel;

public interface JobRepository extends JpaRepository<JobDetailInfoModel, Integer> {
	public List<JobDetailInfoModel> findJobDetailInfoModelByJobName(String jobName);

	@Query("SELECT job FROM JobDetailInfoModel job JOIN FETCH job.compId comp WHERE job.compType = :compType")
	List<JobDetailInfoModel> findAllJobsByCompanyType(@Param("compType") String compType);

	public List<JobDetailInfoModel> findByCompType(String tagName);

	List<JobDetailInfoModel> findByCompId(CompanyInfoModel compId);
}
