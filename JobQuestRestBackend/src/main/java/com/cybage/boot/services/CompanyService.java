package com.cybage.boot.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.CompanyDTO;
import com.cybage.boot.models.CompanyInfoModel;
import com.cybage.boot.repository.CompanyRepository;

@Service
public class CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private ModelMapper modelMapper;

	public List<CompanyDTO> getAllCompnaiesInfo() {
		return companyRepository.findAll().stream().map(company -> modelMapper.map(company, CompanyDTO.class))
				.collect(Collectors.toList());
	}

	public CompanyDTO getSingleCompanyDetail(int compId) {
		CompanyInfoModel companyInfo = companyRepository.findById(compId).get();
		return modelMapper.map(companyInfo, CompanyDTO.class);
	}

	public CompanyDTO putBasicInfoOfCompany(int compId, CompanyDTO companyDto) {
		CompanyInfoModel companyInfo = companyRepository.findById(compId).get();
		if (companyInfo != null) {
			companyInfo.setCompName(companyDto.getCompName());
			companyInfo.setCompContactNo(companyDto.getCompContactNo());
			companyInfo.setCompContactName(companyDto.getCompContactName());
			companyInfo.setCompDesc(companyDto.getCompDesc());

			return modelMapper.map(companyRepository.save(companyInfo), CompanyDTO.class);
		}
		return null;
	}

	public CompanyDTO putMoreInfoOfCompany(int compId, CompanyDTO companyDto) {
		CompanyInfoModel companyInfo = companyRepository.findById(compId).get();
		if (companyInfo != null) {
			companyInfo.setCompWebsiteUrl(companyDto.getCompWebsiteUrl());
			companyInfo.setCompHeadquaters(companyDto.getCompHeadquaters());
			companyInfo.setFoundedAt(companyDto.getFoundedAt());
			companyInfo.setCompType(companyDto.getCompType());
			companyInfo.setCompTagLine(companyDto.getCompTagLine());
			return modelMapper.map(companyRepository.save(companyInfo), CompanyDTO.class);
		}
		return null;
	}

	public CompanyDTO putImageTagInfoOfCompany(int compId, CompanyDTO companyDto) {
		CompanyInfoModel companyInfo = companyRepository.findById(compId).get();
		if (companyInfo != null) {
			companyInfo.setCompBannerImg(companyDto.getCompBannerImg());
			companyInfo.setCompPosterImg(companyDto.getCompPosterImg());
			companyInfo.setTag1(companyDto.getTag1());
			companyInfo.setTag2(companyDto.getTag2());
			companyInfo.setTag3(companyDto.getTag3());
			companyInfo.setTag4(companyDto.getTag4());

			return modelMapper.map(companyRepository.save(companyInfo), CompanyDTO.class);
		}
		return null;
	}

	public CompanyDTO addSingleCompanyData(CompanyDTO companyDTO) {
		CompanyInfoModel companyInfo = modelMapper.map(companyDTO, CompanyInfoModel.class);
		companyInfo = companyRepository.save(companyInfo);
		return modelMapper.map(companyInfo, CompanyDTO.class);
	}

	public void deleteCompanyById(int compId) {
		companyRepository.deleteById(compId);
	}
}
