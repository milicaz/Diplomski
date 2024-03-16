package com.opens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.view.AdminCoworkingMesecnePoseteView;
import com.opens.view.AdminOmladinskiMesecnePoseteView;
import com.opens.view.repository.AdminCoworkingMesecnePoseteViewRepository;
import com.opens.view.repository.AdminOmladinskiMesecnePoseteViewRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private AdminCoworkingMesecnePoseteViewRepository adminCoworkingMesecnePoseteViewRepository;

	@Autowired
	private AdminOmladinskiMesecnePoseteViewRepository adminOmladinskiMesecnePoseteViewRepository;

	@GetMapping("/admin/coworking")
	public List<AdminCoworkingMesecnePoseteView> getCoworking() {
		return adminCoworkingMesecnePoseteViewRepository.findAll();
	}

	@GetMapping("/admin/omladinski")
	public List<AdminOmladinskiMesecnePoseteView> getOmladinski() {
		return adminOmladinskiMesecnePoseteViewRepository.findAll();
	}

}
