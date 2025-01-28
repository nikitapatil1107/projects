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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.models.AppliedJobInfoModel;
import com.cybage.boot.models.SavedJobsInfoModel;
import com.cybage.boot.services.SavedJobsService;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SavedJobsController {
	
	@Autowired
	private SavedJobsService savedJobsService;
	
	@PostMapping(value = "/employee/saveJob")
	public ResponseEntity<SavedJobsInfoModel> applyJob(@RequestBody SavedJobsInfoModel savedJobInfo) {
		return new ResponseEntity<>(savedJobsService.saveJob(savedJobInfo), HttpStatus.CREATED);
	}
	  
	@GetMapping(value = "/employee/fetchSavedJobs")
	public ResponseEntity<List<JobDTO>> fetchUserSavedJobs(@RequestParam("userId") String userId) {
		return new ResponseEntity<>(savedJobsService.fetchJobsSavedByUser(Integer.parseInt(userId)), HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping(value = "/employee/removeSavedJob")
	public ResponseEntity<Boolean> removeSavedJob(@RequestParam("jobId") String jobId,
			@RequestParam("userId") String userId) {
//		savedJobsService.removeUserSavedJob(Integer.parseInt(jobId), Integer.parseInt(userId));
		return new ResponseEntity<>(
				savedJobsService.removeUserSavedJob(Integer.parseInt(jobId), Integer.parseInt(userId)),
				HttpStatus.OK);
	}
}
