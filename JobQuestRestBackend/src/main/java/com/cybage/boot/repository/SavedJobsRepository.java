package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.SavedJobsInfoModel;

public interface SavedJobsRepository extends JpaRepository<SavedJobsInfoModel, Integer> {
	List<SavedJobsInfoModel> findAllByUserId(int userId);

	void deleteByUserIdAndJobId(int userId, int jobId);
}
