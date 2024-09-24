package com.opens.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.opens.model.Logo;

public interface LogoService {
	
	public List<Logo> findAll();
	public Logo addLogo(MultipartFile file) throws IOException;
	public String deleteLogo(Long id);
}
