package com.cybage.boot.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.LoginCompanyDTO;
import com.cybage.boot.dto.LoginUserDTO;
import com.cybage.boot.dto.RegisterCompanyDTO;
import com.cybage.boot.dto.RegisterUserDTO;
import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.models.DomainModel;
import com.cybage.boot.models.UserProfileModel;
import com.cybage.boot.repository.EmployerRepository;

@Service
public class EmployerService {
	
	@Autowired
	private EmployerRepository employerRepository;
	
	@Autowired
	private DomainService domainService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CompanyDetailsService companyDetailsService;
	
	public ResponseEntity<?> registerCompanyData(RegisterCompanyDTO registerCompanyDto) {
		String companyEmail = registerCompanyDto.getCompEmail();
		String domain = "";
        // Regular expression to extract domain between "@" and "."
        String regex = "@(.*?)\\.";

        // Compile the regex pattern
        Pattern pattern = Pattern.compile(regex);

        // Match the pattern against the email
        Matcher matcher = pattern.matcher(companyEmail);
        if (matcher.find()) {
            // Extract the domain
            domain = matcher.group(1);
        }
        
        if (domainService.isDomainPresent(domain)) {
            return new ResponseEntity<>("Organization with domain " + companyEmail + " already exists.", HttpStatus.NOT_ACCEPTABLE);
        }
        
        // Enter Domain
        DomainModel domainData = new DomainModel();
        domainData.setDomainName(domain);
        DomainModel createdDomain = domainService.saveDomain(domainData);
        
        CompanyInfoModel companyDetails = modelMapper.map(registerCompanyDto, CompanyInfoModel.class);
        companyDetails = companyDetailsService.saveCompanyInfo(companyDetails);
        return new ResponseEntity<>(modelMapper.map(companyDetails, RegisterCompanyDTO.class), HttpStatus.CREATED);
	}
	
	public ResponseEntity<?> loginCompanyData(LoginCompanyDTO loginCompanyDto) {
		String companyEmail = loginCompanyDto.getCompEmail();
		String companyPassword = loginCompanyDto.getCompPassword();
        
		String domain = "";
        String regex = "@(.*?)\\.";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(companyEmail);
        
        if (matcher.find()) {
            domain = matcher.group(1);
        }
        
        if (!domainService.isDomainPresent(domain)) {
            return new ResponseEntity<>("Organization with domain " + companyEmail + " does not exists.", HttpStatus.NOT_ACCEPTABLE);
        }
        
        LoginCompanyDTO loginCompany = authenticateCompany(companyEmail, companyPassword);
        
        if (loginCompany == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
        
        return ResponseEntity.ok(loginCompany);
	}
	
	public LoginCompanyDTO authenticateCompany(String companyEmail, String companyPassword) {
		CompanyInfoModel companyInfo = employerRepository.findByCompEmail(companyEmail);
    
        if (companyInfo != null && companyPassword.equals(companyInfo.getCompPassword())) {
            return modelMapper.map(companyInfo, LoginCompanyDTO.class);
        }
        return null; 
	}
}
