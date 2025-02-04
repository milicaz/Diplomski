package com.opens.service.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.opens.model.Logo;
import com.opens.repository.LogoRepository;
import com.opens.service.LogoService;

@Service
public class LogoServiceImpl implements LogoService {
	
	@Autowired
	private LogoRepository logoRepo;
	
	@Override
	public List<Logo> findAll() {
		// TODO Auto-generated method stub
		return logoRepo.findAll();
	}

	@Override
	public Logo addLogo(MultipartFile file) throws IOException {
		
		// Lista dozvoljenih MIME tipova za slike
	    List<String> allowedMimeTypes = List.of("image/jpeg", "image/png", "image/gif", "image/webp");

	    // Proveravamo da li fajl ima dozvoljeni tip
	    if (!allowedMimeTypes.contains(file.getContentType())) {
	        throw new IllegalArgumentException("Invalid file type. Only image files are allowed.");
	    }
		
		Logo logo = new Logo();
		logo.setName(file.getOriginalFilename());
		logo.setType(file.getContentType());
		logo.setPicByte(file.getBytes());
		
		logoRepo.save(logo);
		return logo;
	}

	@Override
	public String deleteLogo(Long id) {
		logoRepo.deleteById(id);
		return null;
	}

}
