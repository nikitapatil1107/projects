package com.cybage.boot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.services.JobSearchService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")

public class JobSearchController {
	@Autowired
	private JobSearchService jobSearchService;
	
	@GetMapping("/searchByJobName")
    public ResponseEntity<List<JobDTO>> getAllByjobName(@RequestParam("searchText") String searchText) {
		return new ResponseEntity<>(jobSearchService.getAllByjobName(searchText), HttpStatus.OK);
    }

}
