package com.cybage.boot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.AppliedJobUserDTO;
import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.models.AppliedJobInfoModel;
import com.cybage.boot.services.AppliedJobsService;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AppliedJobsController {
	@Autowired
	private AppliedJobsService appliedJobsService;

	@GetMapping(value = "/employee/fetchAlreadyApplied")
	public ResponseEntity<Boolean> fetchJobAlreadyApplied(@RequestParam("userId") String userId,
			@RequestParam("jobId") String jobId) {
		return new ResponseEntity<>(
				appliedJobsService.fetchJobAlreadyApplied(Integer.parseInt(userId), Integer.parseInt(jobId)),
				HttpStatus.OK);
	}

	@GetMapping(value = "/employee/fetchAppliedJobs")
	public ResponseEntity<List<JobDTO>> fetchUserAppliedJobs(@RequestParam("userId") String userId) {
		return new ResponseEntity<>(appliedJobsService.fetchJobsAppliedByUser(Integer.parseInt(userId)), HttpStatus.OK);
	}

	@PostMapping(value = "/employee/applyJob")
	public ResponseEntity<AppliedJobInfoModel> applyJob(@RequestBody AppliedJobInfoModel appliedJobInfo) {
		return new ResponseEntity<>(appliedJobsService.applyToJob(appliedJobInfo), HttpStatus.CREATED);
	}

	@Transactional
	@DeleteMapping(value = "/employee/removeAppliedJob")
	public ResponseEntity<Boolean> removeAppliedJob(@RequestParam("jobId") String jobId,
			@RequestParam("userId") String userId) {
		appliedJobsService.removeUserAppliedJob(Integer.parseInt(jobId), Integer.parseInt(userId));
		return new ResponseEntity<>(
				appliedJobsService.removeUserAppliedJob(Integer.parseInt(jobId), Integer.parseInt(userId)),
				HttpStatus.OK);
	}

	@GetMapping(path = "/employer/getAllAppliedUsers")
	public ResponseEntity<List<AppliedJobUserDTO>> getAllAppliedJobsUsers(@RequestParam("compId") int compId) {
		return new ResponseEntity<>(appliedJobsService.getAllUsersOfCompany(compId), HttpStatus.OK);
	}

	@Transactional
	@DeleteMapping(path = "/employer/removeAppliedUser")
	public ResponseEntity<String> removeAppliedUser(@RequestParam("jobId") int jobId,
			@RequestParam("compId") int compId, @RequestParam("userId") int userId) {
		return new ResponseEntity<>(appliedJobsService.removeAppliedUser(jobId, compId, userId), HttpStatus.OK);
	}
}
