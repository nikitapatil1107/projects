package com.cybage.boot.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.models.JobDetailInfoModel;
import com.cybage.boot.repository.CompanyRepository;
import com.cybage.boot.repository.JobRepository;

@Service
public class JobService {

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private ModelMapper modelMapper;

	public List<JobDTO> getAllJobsInfo() {
		return jobRepository.findAll().stream().map(job -> modelMapper.map(job, JobDTO.class))
				.collect(Collectors.toList());
	}

	public List<JobDTO> getAllJobsByTags(String tagName) {
		List<JobDTO> listOfAllJobsByTags = jobRepository.findAll().stream()
				.map(job -> modelMapper.map(job, JobDTO.class)).collect(Collectors.toList());
		return listOfAllJobsByTags.stream().filter(obj -> obj.getCompType().trim().equalsIgnoreCase(tagName))
				.collect(Collectors.toList());
	}

	public List<JobDTO> getAllJobsByJobName(String jobName) {
		List<JobDTO> listOfAllJobsByJobName = jobRepository.findAll().stream()
				.map(job -> modelMapper.map(job, JobDTO.class)).collect(Collectors.toList());
		return listOfAllJobsByJobName.stream().filter(obj -> obj.getJobName().trim().equalsIgnoreCase(jobName))
				.collect(Collectors.toList());
	}

	public JobDTO getSingleJobData(int jobId) {
		JobDetailInfoModel jobData = jobRepository.findById(jobId).get();
		return modelMapper.map(jobData, JobDTO.class);
	}

	public JobDTO saveSingleJobData(JobDTO jobDto) {
		JobDetailInfoModel jobInfo = modelMapper.map(jobDto, JobDetailInfoModel.class);
		jobInfo = jobRepository.save(jobInfo);
		return modelMapper.map(jobInfo, JobDTO.class);
	}

	public List<JobDTO> getAllJobsOfCompany(int compId) {
		CompanyInfoModel companyInfo = companyRepository.findById(compId).get();
		return jobRepository.findByCompId(companyInfo).stream().map(job -> modelMapper.map(job, JobDTO.class))
				.collect(Collectors.toList());
	}

	public JobDTO editJobDataCompany(int jobId, JobDTO jobDataDto) {
		JobDetailInfoModel jobInfoModel = jobRepository.findById(jobId).get();
		if (jobInfoModel != null) {
			jobDataDto.setJobId(jobInfoModel.getJobId());
			return modelMapper.map(jobRepository.save(modelMapper.map(jobDataDto, JobDetailInfoModel.class)),
					JobDTO.class);
		}
		return null;
	}

	public JobDTO toggleIsActiveStatus(int jobId, boolean jobActiveStatus) {
		JobDetailInfoModel jobInfoModel = jobRepository.findById(jobId).get();
		if (jobInfoModel != null) {
			jobInfoModel.setJobActive(jobActiveStatus);
			return modelMapper.map(jobRepository.save(modelMapper.map(jobInfoModel, JobDetailInfoModel.class)),
					JobDTO.class);
		}
		return null;
	}

	public void deleteJobById(int jobId) {
		jobRepository.deleteById(jobId);
	}
}
