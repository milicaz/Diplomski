package com.opens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.view.AdminGodisnjeAktivnostiView;
import com.opens.view.AdminMesecnePoseteView;
import com.opens.view.AdminPoseteCountView;
import com.opens.view.AdminUcesniciCountView;
import com.opens.view.repository.AdminGodisnjeAktivnostiViewRepository;
import com.opens.view.repository.AdminMesecnePoseteViewRepository;
import com.opens.view.repository.AdminPoseteCountViewRepository;
import com.opens.view.repository.AdminUcesniciCountViewRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private AdminMesecnePoseteViewRepository adminMesecnePoseteViewRepository;

	@Autowired
	private AdminPoseteCountViewRepository adminPoseteCountViewRepository;
	
	@Autowired
	private AdminUcesniciCountViewRepository adminUcesniciCountViewRepository;
	
	@Autowired
	private AdminGodisnjeAktivnostiViewRepository adminGodisnjeAktivnostiViewRepository;

	@GetMapping("/admin/{mestoPoseteId}")
	public List<AdminMesecnePoseteView> getMesecnePosete(@PathVariable Long mestoPoseteId) {
		return adminMesecnePoseteViewRepository.findByMestoPoseteId(mestoPoseteId);
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
