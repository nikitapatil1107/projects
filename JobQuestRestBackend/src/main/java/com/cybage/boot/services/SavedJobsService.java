package com.cybage.boot.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.models.AppliedJobInfoModel;
import com.cybage.boot.models.SavedJobsInfoModel;
import com.cybage.boot.repository.SavedJobsRepository;

@Service
public class SavedJobsService {
	@Autowired
	private SavedJobsRepository savedJobsRepository;
	
	@Autowired
	private JobService jobService;
	
	public SavedJobsInfoModel saveJob(SavedJobsInfoModel savedJobInfo) {
		return savedJobsRepository.save(savedJobInfo);
	}
	
	public List<JobDTO> fetchJobsSavedByUser(int userId) {
		List<SavedJobsInfoModel> savedJobs = savedJobsRepository.findAllByUserId(userId);
		List<JobDTO> jobDetailsList = new ArrayList<>();

		for (SavedJobsInfoModel appliedJob : savedJobs) {
			int jobId = appliedJob.getJobId();
			JobDTO jobDetailInfo = jobService.getSingleJobData(jobId);
			jobDetailsList.add(jobDetailInfo);
		}

		return jobDetailsList;
	}
	
	public boolean removeUserSavedJob(int jobId, int userId) {
		try {
			savedJobsRepository.deleteByUserIdAndJobId(userId, jobId);
			return true;
		} catch (Exception e) {
			// If the data was not found or not deleted
			return false;
		}
	}
}
