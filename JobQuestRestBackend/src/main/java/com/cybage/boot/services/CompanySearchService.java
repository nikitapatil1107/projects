package com.cybage.boot.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.CompanyDTO;
import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.repository.CompanySearchRepository;

@Service
public class CompanySearchService {
	@Autowired
	private CompanySearchRepository companySearchRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	
	public List<CompanyDTO> getAllByCompName(String searchText ) {
	    List<CompanyInfoModel> companyInfos = companySearchRepository.findByCompNameContaining(searchText );
	    return companyInfos.stream()
	                   .map(companyInfo -> modelMapper.map(companyInfo, CompanyDTO.class))
	                   .collect(Collectors.toList());
	}
}
