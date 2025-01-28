package com.cybage.boot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.services.JobService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JobController {

	@Autowired
	private JobService jobService;

	@GetMapping(path = "/employee/getAllJobs")
	public ResponseEntity<List<JobDTO>> getAllJobs() {
		return new ResponseEntity<>(jobService.getAllJobsInfo(), HttpStatus.OK);
	}

	@GetMapping(path = "/employee/getSingleJob")
	public ResponseEntity<JobDTO> getSingleJobDataById(@RequestParam("jobId") int jobId) {
		return new ResponseEntity<>(jobService.getSingleJobData(jobId), HttpStatus.OK);
	}

	@GetMapping(path = "/employee/getJobsByTag")
	public ResponseEntity<List<JobDTO>> getJobsByTagName(@RequestParam("tagName") String tagName) {
		return new ResponseEntity<>(jobService.getAllJobsByTags(tagName), HttpStatus.OK);
	}

	@GetMapping(path = "/employee/getJobsByJobName")
	public ResponseEntity<List<JobDTO>> getJobsByJobName(@RequestParam("jobName") String jobName) {
		return new ResponseEntity<>(jobService.getAllJobsByJobName(jobName), HttpStatus.OK);
	}

	@PostMapping(path = "/employer/saveJobInfoCompany")
	public ResponseEntity<JobDTO> addSingleJob(@RequestBody JobDTO jobData) {
		return new ResponseEntity<>(jobService.saveSingleJobData(jobData), HttpStatus.CREATED);
	}

	@GetMapping(path = "/employer/getAllJobsOfCompany")
	public ResponseEntity<List<JobDTO>> getAllJobsOfCompany(@RequestParam("compId") int compId) {
		return new ResponseEntity<>(jobService.getAllJobsOfCompany(compId), HttpStatus.OK);
	}

	@PutMapping(path = "/employer/editJobInfoCompany")
	public ResponseEntity<JobDTO> editJobInfoCompany(@RequestParam("jobId") int jobId, @RequestBody JobDTO jobDataDto) {
		return new ResponseEntity<>(jobService.editJobDataCompany(jobId, jobDataDto), HttpStatus.OK);
	}

	@PutMapping(path = "/employer/toggleJobIsActiveStatus")
	public ResponseEntity<JobDTO> toggleIsActiveStatus(@RequestParam("jobId") int jobId,
			@RequestBody boolean jobActiveStatus) {
		return new ResponseEntity<>(jobService.toggleIsActiveStatus(jobId, jobActiveStatus), HttpStatus.OK);
	}

	@DeleteMapping(path = "employer/deleteJobById")
	public ResponseEntity<String> deleteJobById(@RequestParam("jobId") int jobId) {
		jobService.deleteJobById(jobId);
		return new ResponseEntity<>("Job Deleted!!!", HttpStatus.OK);
	}

}
