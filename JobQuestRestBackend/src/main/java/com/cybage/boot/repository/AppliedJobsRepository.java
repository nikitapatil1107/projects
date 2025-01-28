package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.AppliedJobInfoModel;

public interface AppliedJobsRepository extends JpaRepository<AppliedJobInfoModel, Integer> {
	AppliedJobInfoModel findByIdAndJobId(int id, int jobId);
	List<AppliedJobInfoModel> findAllById(int id);
	void deleteByIdAndJobId(int id, int jobId);
	List<AppliedJobInfoModel> findByCompId(int compId);
	AppliedJobInfoModel findByJobIdAndCompIdAndId(int jobId, int compId, int userId);
}
