package com.opens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.view.AdminCoworkingMesecnePoseteView;
import com.opens.view.AdminGodisnjeAktivnostiView;
import com.opens.view.AdminOmladinskiMesecnePoseteView;
import com.opens.view.AdminPoseteCountView;
import com.opens.view.AdminUcesniciCountView;
import com.opens.view.repository.AdminCoworkingMesecnePoseteViewRepository;
import com.opens.view.repository.AdminGodisnjeAktivnostiViewRepository;
import com.opens.view.repository.AdminOmladinskiMesecnePoseteViewRepository;
import com.opens.view.repository.AdminPoseteCountViewRepository;
import com.opens.view.repository.AdminUcesniciCountViewRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private AdminCoworkingMesecnePoseteViewRepository adminCoworkingMesecnePoseteViewRepository;

	@Autowired
	private AdminOmladinskiMesecnePoseteViewRepository adminOmladinskiMesecnePoseteViewRepository;
	
	@Autowired
	private AdminPoseteCountViewRepository adminPoseteCountViewRepository;
	
	@Autowired
	private AdminUcesniciCountViewRepository adminUcesniciCountViewRepository;
	
	@Autowired
	private AdminGodisnjeAktivnostiViewRepository adminGodisnjeAktivnostiViewRepository;

	@GetMapping("/admin/coworking")
	public List<AdminCoworkingMesecnePoseteView> getCoworking() {
		return adminCoworkingMesecnePoseteViewRepository.findAll();
	}

	@GetMapping("/admin/omladinski")
	public List<AdminOmladinskiMesecnePoseteView> getOmladinski() {
		return adminOmladinskiMesecnePoseteViewRepository.findAll();
	}
	
	@GetMapping("/admin/posete")
	public List<AdminPoseteCountView> getUkupnePosete() {
		return adminPoseteCountViewRepository.findAll();
	}
	
	@GetMapping("/admin/ucesnici")
	public List<AdminUcesniciCountView> getUkupnoUcesnika() {
		return adminUcesniciCountViewRepository.findAll();
	}
	
	@GetMapping("/admin/dogadjaji/{godinaDogadjaja}")
	public List<AdminGodisnjeAktivnostiView> getUkupnoDogadjaja(@PathVariable Integer godinaDogadjaja) {
		return adminGodisnjeAktivnostiViewRepository.findByGodinaDogadjaja(godinaDogadjaja);
	}

}
