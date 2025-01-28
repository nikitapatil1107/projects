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

import com.cybage.boot.dto.CompanyDTO;
import com.cybage.boot.dto.EventDTO;
import com.cybage.boot.services.HomeService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")
public class HomeController {

	@Autowired
	private HomeService homeService;

	@GetMapping(path = "/getAllCompanies")
	public ResponseEntity<List<CompanyDTO>> getAllCompaniesInfo() {
		return new ResponseEntity<>(homeService.getAllCompanyInfo(), HttpStatus.OK);
	}
	
	@GetMapping(path = "/getAllEvents")
	public ResponseEntity<List<EventDTO>> getAllEventsInfo() {
		return new ResponseEntity<>(homeService.getAllEventsInfo(), HttpStatus.OK);
	}
	
	@GetMapping(path = "/companyList")
	public ResponseEntity<List<CompanyDTO>> companyListWithTags(@RequestParam("companyTag") String companyTag) {
		
		List<CompanyDTO> companyList = homeService.getCompaniesWithTags(companyTag);

        if (companyList != null && !companyList.isEmpty()) {
            return ResponseEntity.ok().body(companyList);
        } else {
            return ResponseEntity.notFound().build();
        }
	}
}
