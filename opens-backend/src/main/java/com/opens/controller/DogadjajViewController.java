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

import com.opens.view.DogadjajiView;
import com.opens.view.repository.DogadjajiViewRepository;

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
public class DogadjajViewController {
	
	@Autowired
	private DogadjajiViewRepository dogRepo;
	
	@GetMapping("/dogadjajiView")
	public ResponseEntity<List<DogadjajiView>> getAll() {
		List<DogadjajiView> dogadjaji = new ArrayList<>();
		
		dogadjaji = dogRepo.findAll();
		
		return new ResponseEntity<>(dogadjaji, HttpStatus.OK);
	}
	
	@GetMapping("/dogadjajiView/{mesec}/{vrsta}")
	public ResponseEntity<List<DogadjajiView>> getAllByMesecVrsta(@PathVariable Long mesec, @PathVariable String vrsta) throws JRException {
		List<DogadjajiView> dogadjajiMesecVrsta = new ArrayList<>();
		
		dogadjajiMesecVrsta = dogRepo.findByMesecAndVrsta(mesec, vrsta);
		
		String filePath = "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\dogadjajireport.jrxml";
		
		JRBeanCollectionDataSource dogadjajiDataSource = new JRBeanCollectionDataSource(dogadjajiMesecVrsta);
		
		JRBeanCollectionDataSource dogadjajiDataSourceDva = new JRBeanCollectionDataSource(dogadjajiMesecVrsta);
		
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("ime_zaposlenog", "Antonija");
		parameters.put("prezime_zaposlenog", "Cverdelj");
		parameters.put("mesec", mesec);
		parameters.put("godina", "2024");
		parameters.put("vrsta", vrsta);
		parameters.put("dogadjajiDataSet", dogadjajiDataSource);
		parameters.put("dogadjajiDataSetDva", dogadjajiDataSourceDva);
		
		JasperReport report = JasperCompileManager.compileReport(filePath);
		JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
		JasperExportManager.exportReportToPdfFile(print, "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\dogadjajireport.pdf");
		System.out.println("Izvestaj je kreiran!");
		
		return new ResponseEntity<>(dogadjajiMesecVrsta, HttpStatus.OK);
		
	}

}
