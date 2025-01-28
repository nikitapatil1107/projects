package com.cybage.boot.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.AppliedJobUserDTO;
import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.models.AppliedJobInfoModel;
import com.cybage.boot.models.JobDetailInfoModel;
import com.cybage.boot.models.UserProfileModel;
import com.cybage.boot.repository.AppliedJobsRepository;
import com.cybage.boot.repository.ProfileRepository;

@Service
public class AppliedJobsService {
	@Autowired
	private AppliedJobsRepository appliedJobsRepository;

	@Autowired
	private ProfileRepository userProfileRepository;

	@Autowired
	private JobService jobService;

	@Autowired
	private ModelMapper modelMapper;

	public boolean fetchJobAlreadyApplied(int userId, int jobId) {
		AppliedJobInfoModel appliedJob = appliedJobsRepository.findByIdAndJobId(userId, jobId);

		if (appliedJob != null) {
			return true;
		} else {
			return false;
		}
	}

	public List<JobDTO> fetchJobsAppliedByUser(int userId) {
		List<AppliedJobInfoModel> appliedJobs = appliedJobsRepository.findAllById(userId);
		List<JobDTO> jobDetailsList = new ArrayList<>();

		for (AppliedJobInfoModel appliedJob : appliedJobs) {
			int jobId = appliedJob.getJobId();
			JobDTO jobDetailInfo = jobService.getSingleJobData(jobId);
			jobDetailsList.add(jobDetailInfo);
		}

		return jobDetailsList;
	}

	public AppliedJobInfoModel applyToJob(AppliedJobInfoModel appliedJobInfo) {
		return appliedJobsRepository.save(appliedJobInfo);
	}

	public boolean removeUserAppliedJob(int jobId, int userId) {
		try {
			appliedJobsRepository.deleteByIdAndJobId(userId, jobId);
			return true;
		} catch (EmptyResultDataAccessException e) {
			// If the data was not found or not deleted
			return false;
		}
	}

	public List<AppliedJobUserDTO> getAllUsersOfCompany(int compId) {
		List<AppliedJobInfoModel> appliedJobList = appliedJobsRepository.findByCompId(compId);
		List<AppliedJobUserDTO> listOfUsersAppliedToJobs = new ArrayList<>();
		for (AppliedJobInfoModel job : appliedJobList) {
			UserProfileModel userProfile = userProfileRepository.findById(job.getId()).get();
			AppliedJobUserDTO appliedJobUser = modelMapper.map(userProfile, AppliedJobUserDTO.class);
			appliedJobUser.setJobName(job.getJobName());
			appliedJobUser.setJobId(job.getJobId());
			appliedJobUser.setJobDataActive(job.getIsJobRejected());
			listOfUsersAppliedToJobs.add(appliedJobUser);
		}
		return listOfUsersAppliedToJobs;
	}
	
	public String removeAppliedUser(int jobId, int compId, int userId) {
		AppliedJobInfoModel applyJob = appliedJobsRepository.findByJobIdAndCompIdAndId(jobId, compId, userId);
		applyJob.setIsJobRejected(true);
		appliedJobsRepository.save(applyJob);
		return "";
	}

}
