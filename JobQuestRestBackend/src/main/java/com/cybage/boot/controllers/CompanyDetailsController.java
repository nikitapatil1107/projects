package com.cybage.boot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.models.JobDetailInfoModel;
import com.cybage.boot.services.CompanyDetailsService;
import com.cybage.boot.services.EmailService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyDetailsController {
	@Autowired
	private CompanyDetailsService companyDetailsService;
	
	@GetMapping(value = "/companyDetails")
	public ResponseEntity<CompanyInfoModel> fetchCompanyDetails(@RequestParam("companyId") String companyId) {
		
		try {
            int companyInfoId = Integer.parseInt(companyId);
            CompanyInfoModel companyInfo = companyDetailsService.getCompanyInfo(companyInfoId);
         
            if (companyInfo != null) {
                return ResponseEntity.ok().body(companyInfo);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build(); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
	}
	
	@PostMapping(value = "/companyDetails")
	public ResponseEntity<CompanyInfoModel> saveCompanyDetails(@RequestBody CompanyInfoModel companyInfoModel) {
		try {
            CompanyInfoModel savedCompanyInfo = companyDetailsService.saveCompanyInfo(companyInfoModel);
            return ResponseEntity.ok().body(savedCompanyInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
	}
}
