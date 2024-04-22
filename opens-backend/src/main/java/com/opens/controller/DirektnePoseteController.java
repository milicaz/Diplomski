package com.opens.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.view.DirektniCoworkingView;
import com.opens.view.DirektniOmladinskiView;
import com.opens.view.DirektniUkupnoCoworkingView;
import com.opens.view.DirektniUkupnoOmladinskiView;
import com.opens.view.UkupnoPosetaCoworkingView;
import com.opens.view.UkupnoPosetaOmladinskiView;
import com.opens.view.repository.DirektniCoworkingViewRepository;
import com.opens.view.repository.DirektniOmladinskiViewRepository;
import com.opens.view.repository.DirektniUkupnoCoworkingViewRepository;
import com.opens.view.repository.DirektniUkupnoOmladinskiViewRepository;
import com.opens.view.repository.UkupnoPosetaCoworkingViewRepository;
import com.opens.view.repository.UkupnoPosetaOmladinskiViewRepository;

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
@CrossOrigin(origins = "http://localhost:3000")
public class DirektnePoseteController {

	@Autowired
	private DirektniCoworkingViewRepository direktniCoworkingViewRepository;

	@Autowired
	private DirektniUkupnoCoworkingViewRepository direktniUkupnoCoworkingViewRepository;

	@Autowired
	private UkupnoPosetaCoworkingViewRepository ukupnoPosetaCoworkingViewRepository;

	@Autowired
	private DirektniOmladinskiViewRepository direktniOmladinskiViewRepository;

	@Autowired
	private DirektniUkupnoOmladinskiViewRepository direktniUkupnoOmladinskiViewRepository;

	@Autowired
	private UkupnoPosetaOmladinskiViewRepository ukupnoPosetaOmladinskiViewRepository;

	@GetMapping("/coworking/pdf/{mesecPosete}/godina/{godinaPosete}")
	public ResponseEntity<byte[]> coworkingPDFReport(@PathVariable Integer mesecPosete,
			@PathVariable Integer godinaPosete) throws JRException, FileNotFoundException {

		List<DirektniCoworkingView> direktniCoworkingList = direktniCoworkingViewRepository
				.findByMesecPoseteAndGodinaPosete(mesecPosete, godinaPosete);
		File file = ResourceUtils.getFile("classpath:direktniKorisnici.jrxml");
		JRBeanCollectionDataSource direktniCoworkingDataSource = new JRBeanCollectionDataSource(direktniCoworkingList);

		// subreport za direktne posete
		List<DirektniUkupnoCoworkingView> direktniUkupnoList = direktniUkupnoCoworkingViewRepository
				.findByMesecPoseteAndGodinaPosete(mesecPosete, godinaPosete);
		JRBeanCollectionDataSource ukupnoDataSource = new JRBeanCollectionDataSource(direktniUkupnoList);

		Map<String, Object> direktniUkupnoParameter = new HashMap<>();
		direktniUkupnoParameter.put("ukupnoDataset", ukupnoDataSource);

		// subreport za ukupne posete
		List<UkupnoPosetaCoworkingView> ukupnoPosetaList = ukupnoPosetaCoworkingViewRepository
				.findByMesecPoseteAndGodinaPosete(mesecPosete, godinaPosete);
		JRBeanCollectionDataSource ukupnoPosetaDataSource = new JRBeanCollectionDataSource(ukupnoPosetaList);

		Map<String, Object> ukupnoPoseteParameter = new HashMap<>();
		ukupnoPoseteParameter.put("poseteDataset", ukupnoPosetaDataSource);
		
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("direktniDataSet", direktniCoworkingDataSource);
		parameters.put("direktniUkupnoReport", getDirektniUkupnoReport());
		parameters.put("direktniUkupnoParametar", direktniUkupnoParameter);
		parameters.put("ukupnoPosetaReport", getUkupnoPosetaReport());
		parameters.put("ukupnoPosetaParametar", ukupnoPoseteParameter);
		
		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());
		
		HttpHeaders headers = new HttpHeaders();
		// set the PDF format
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", "direktni.pdf");

		return new ResponseEntity<byte[]>(JasperExportManager.exportReportToPdf(jasperPrint), headers, HttpStatus.OK);
	}
	
	@GetMapping("/omladinski/pdf/{mesecPosete}/godina/{godinaPosete}")
	public ResponseEntity<byte[]> omladinskiPDFReport(@PathVariable Integer mesecPosete,
			@PathVariable Integer godinaPosete) throws JRException, FileNotFoundException {

		List<DirektniOmladinskiView> direktniOmladinskiList = direktniOmladinskiViewRepository
				.findByMesecPoseteAndGodinaPosete(mesecPosete, godinaPosete);
		File file = ResourceUtils.getFile("classpath:direktniKorisnici.jrxml");
		JRBeanCollectionDataSource direktniOmladinskiDataSource = new JRBeanCollectionDataSource(direktniOmladinskiList);

		// subreport za direktne posete
		List<DirektniUkupnoOmladinskiView> direktniUkupnoList = direktniUkupnoOmladinskiViewRepository
				.findByMesecPoseteAndGodinaPosete(mesecPosete, godinaPosete);
		JRBeanCollectionDataSource ukupnoDataSource = new JRBeanCollectionDataSource(direktniUkupnoList);

		Map<String, Object> direktniUkupnoParameter = new HashMap<>();
		direktniUkupnoParameter.put("ukupnoDataset", ukupnoDataSource);

		// subreport za ukupne posete
		List<UkupnoPosetaOmladinskiView> ukupnoPosetaList = ukupnoPosetaOmladinskiViewRepository
				.findByMesecPoseteAndGodinaPosete(mesecPosete, godinaPosete);
		JRBeanCollectionDataSource ukupnoPosetaDataSource = new JRBeanCollectionDataSource(ukupnoPosetaList);

		Map<String, Object> ukupnoPoseteParameter = new HashMap<>();
		ukupnoPoseteParameter.put("poseteDataset", ukupnoPosetaDataSource);
		
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("direktniDataSet", direktniOmladinskiDataSource);
		parameters.put("direktniUkupnoReport", getDirektniUkupnoReport());
		parameters.put("direktniUkupnoParametar", direktniUkupnoParameter);
		parameters.put("ukupnoPosetaReport", getUkupnoPosetaReport());
		parameters.put("ukupnoPosetaParametar", ukupnoPoseteParameter);
		
		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());
		
		HttpHeaders headers = new HttpHeaders();
		// set the PDF format
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", "direktni.pdf");

		return new ResponseEntity<byte[]>(JasperExportManager.exportReportToPdf(jasperPrint), headers, HttpStatus.OK);
	}
	
	private JasperReport getDirektniUkupnoReport() throws FileNotFoundException, JRException {
		File file = ResourceUtils.getFile("classpath:direktniUkupno.jrxml");
		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
		return jasperReport;
	}
	
	private JasperReport getUkupnoPosetaReport() throws FileNotFoundException, JRException {
		File file = ResourceUtils.getFile("classpath:ukupnoPoseta.jrxml");
		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
		return jasperReport;
	}

}
