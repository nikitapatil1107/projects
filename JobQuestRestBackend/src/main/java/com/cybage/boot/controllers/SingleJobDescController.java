package com.cybage.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.models.JobDetailInfoModel;
import com.cybage.boot.services.JobService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")
public class SingleJobDescController {
	@Autowired
	private JobService jobService;
	
	@GetMapping(value = "/singleJob")
	public ResponseEntity<JobDTO> fetchCompanyDetails(@RequestParam("jobId") String jobId) {

		try {
            int jobInfoId = Integer.parseInt(jobId);
            JobDTO jobInfo = jobService.getSingleJobData(jobInfoId);
         
            if (jobInfo != null) {
                return ResponseEntity.ok().body(jobInfo);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build(); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

	}
}
