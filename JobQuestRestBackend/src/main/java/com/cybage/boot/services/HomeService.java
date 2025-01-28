package com.cybage.boot.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.CompanyDTO;
import com.cybage.boot.dto.EventDTO;
import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.repository.CompanyRepository;
import com.cybage.boot.repository.EventRepository;
import com.cybage.boot.repository.JobRepository;

@Service
public class HomeService {
	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private ModelMapper modelMapper;

	public List<CompanyDTO> getAllCompanyInfo() {
		return companyRepository.findAll().stream().map(company -> modelMapper.map(company, CompanyDTO.class))
				.collect(Collectors.toList());
	}

	public List<EventDTO> getAllEventsInfo() {
		return eventRepository.findAll().stream().map(event -> modelMapper.map(event, EventDTO.class))
				.collect(Collectors.toList());
	}
	
	public List<CompanyDTO> getCompaniesWithTags(String companyTag) {
		List<CompanyInfoModel> companies = companyRepository.findByTag1OrTag2OrTag3OrTag4(companyTag, companyTag, companyTag, companyTag);
        return companies.stream()
                .map(company -> modelMapper.map(company, CompanyDTO.class))
                .collect(Collectors.toList());
	}
}
