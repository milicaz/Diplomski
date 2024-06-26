package com.opens.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Dogadjaj;
import com.opens.repository.DogadjajRepository;
import com.opens.view.UcesniciView;
import com.opens.view.repository.UcesniciViewRepository;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@RestController
@RequestMapping("/api")
public class UcesniciViewContorller {
	
	@Autowired
	private UcesniciViewRepository ucRepo;
	
	@Autowired
	private DogadjajRepository dogadjajRepo;
	
	@GetMapping("/ucesniciView")
	public ResponseEntity<List<UcesniciView>> getAll() {
		List<UcesniciView> ucesnici = new ArrayList<>();
		
		ucesnici = ucRepo.findAll();
		
		return new ResponseEntity<>(ucesnici, HttpStatus.OK);
	}
	
	@GetMapping("/ucesniciView/{doznaka}")
	public ResponseEntity<List<UcesniciView>> getAllByOznaka(@PathVariable Long doznaka) throws JRException {
		List<UcesniciView> ucesniciOznaka = new ArrayList<>();
		
		Dogadjaj dogadjaj = new Dogadjaj();
		
		dogadjaj = dogadjajRepo.findOneById(doznaka);
		
		System.out.println("Dogadjaj je: " + dogadjaj);
		
		ucesniciOznaka = ucRepo.findByDoznaka(doznaka);
		
		String filePath = "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\ucesniciReport.jrxml";
		
		JRBeanCollectionDataSource ucesniciDataSource = new JRBeanCollectionDataSource(ucesniciOznaka);
		
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("dogadjaj", dogadjaj.getNaziv());
		parameters.put("organizator", dogadjaj.getOrganizacija().getNaziv());
		parameters.put("datum", dogadjaj.getDatum());
		parameters.put("mesto", dogadjaj.getMesto().getNazivSale());
		parameters.put("pocetak", dogadjaj.getPocetakDogadjaja());
		parameters.put("kraj", dogadjaj.getKrajDogadjaja());
		parameters.put("ucesniciDataSet", ucesniciDataSource);
		
		JasperReport report = JasperCompileManager.compileReport(filePath);
		JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
		JasperExportManager.exportReportToPdfFile(print, "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\ucesniciReport.pdf");
		System.out.println("Izvestaj je kreiran!");
		
		return new ResponseEntity<>(ucesniciOznaka, HttpStatus.OK);
	}

}
