package com.cybage.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.CompanyDTO;
import com.cybage.boot.services.CompanyService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@GetMapping(path = "/employee/getSingleCompany")
	public ResponseEntity<CompanyDTO> getSingleCompanyData(@RequestParam("compId") int compId) {
		return new ResponseEntity<>(companyService.getSingleCompanyDetail(compId), HttpStatus.OK);
	}
	
	@PutMapping(path = "/employer/putBasicCompanyInfo")
	public ResponseEntity<CompanyDTO> editBasicCompanyInfo(@RequestParam("compId") int compId, @RequestBody CompanyDTO companyDto) {
		return new ResponseEntity<>(companyService.putBasicInfoOfCompany(compId, companyDto), HttpStatus.OK);
	}
	@PutMapping(path = "/employer/putMoreInfoCompany")
	public ResponseEntity<CompanyDTO> editMoreInfoCompany(@RequestParam("compId") int compId, @RequestBody CompanyDTO companyDto) {
		return new ResponseEntity<>(companyService.putMoreInfoOfCompany(compId, companyDto), HttpStatus.OK);
	}
	@PutMapping(path = "/employer/putImageTagsInfoCompany")
	public ResponseEntity<CompanyDTO> editImageTagCompanyInfo(@RequestParam("compId") int compId, @RequestBody CompanyDTO companyDto) {
		return new ResponseEntity<>(companyService.putImageTagInfoOfCompany(compId, companyDto), HttpStatus.OK);
	}
	
	@GetMapping(path = "/employer/getCompanyDetail")
	public ResponseEntity<CompanyDTO> getSingleCompanyForEmployer(@RequestParam("compId") int compId) {
		return new ResponseEntity<>(companyService.getSingleCompanyDetail(compId), HttpStatus.OK);
	}
}
