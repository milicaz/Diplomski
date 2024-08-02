package com.opens.controller;

import java.awt.Image;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.imageio.ImageIO;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Logo;
import com.opens.repository.LogoRepository;
import com.opens.view.DirektniUkupnoView;
import com.opens.view.DirektniView;
import com.opens.view.UkupnoPosetaView;
import com.opens.view.repository.DirektniUkupnoViewRepository;
import com.opens.view.repository.DirektniViewRepository;
import com.opens.view.repository.UkupnoPosetaViewRepository;

import jakarta.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DirektnePoseteController {

	@Autowired
	private DirektniViewRepository direktniViewRepository;

	@Autowired
	private DirektniUkupnoViewRepository direktniUkupnoViewRepository;

	@Autowired
	private UkupnoPosetaViewRepository ukupnoPosetaViewRepository;

	@Autowired
	private LogoRepository logoRepository;

	@GetMapping("/{mestoPoseteId}/pdf/{mesecPosete}/godina/{godinaPosete}")
	public ResponseEntity<byte[]> pdfReport(@PathVariable Long mestoPoseteId, @PathVariable Integer mesecPosete,
			@PathVariable Integer godinaPosete, @RequestParam(required = false) Long headerImageId,
			@RequestParam(required = false) Long footerImageId) throws JRException, FileNotFoundException {

		List<DirektniView> direktniList = direktniViewRepository
				.findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(mestoPoseteId, mesecPosete, godinaPosete);
		File file = ResourceUtils.getFile("classpath:direktniKorisnici.jrxml");
		JRBeanCollectionDataSource direktniCoworkingDataSource = new JRBeanCollectionDataSource(direktniList);

		// subreport za direktne posete
		List<DirektniUkupnoView> direktniUkupnoList = direktniUkupnoViewRepository
				.findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(mestoPoseteId, mesecPosete, godinaPosete);
		JRBeanCollectionDataSource ukupnoDataSource = new JRBeanCollectionDataSource(direktniUkupnoList);

		Map<String, Object> direktniUkupnoParameter = new HashMap<>();
		direktniUkupnoParameter.put("ukupnoDataset", ukupnoDataSource);

		// subreport za ukupne posete
		List<UkupnoPosetaView> ukupnoPosetaList = ukupnoPosetaViewRepository
				.findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(mestoPoseteId, mesecPosete, godinaPosete);
		JRBeanCollectionDataSource ukupnoPosetaDataSource = new JRBeanCollectionDataSource(ukupnoPosetaList);

		Map<String, Object> ukupnoPoseteParameter = new HashMap<>();
		ukupnoPoseteParameter.put("poseteDataset", ukupnoPosetaDataSource);

		byte[] headerImageByte = null;
		if (headerImageId != null) {
			Optional<Logo> header = logoRepository.findById(headerImageId);
			if (header.isPresent()) {
				headerImageByte = header.get().getPicByte();
			}
		}

		byte[] footerImageByte = null;
		if (footerImageId != null) {
			Optional<Logo> footer = logoRepository.findById(footerImageId);
			if (footer.isPresent()) {
				footerImageByte = footer.get().getPicByte();
			}
		}

		Map<String, Object> parameters = new HashMap<>();
		parameters.put("direktniDataSet", direktniCoworkingDataSource);
		parameters.put("direktniUkupnoReport", getDirektniUkupnoReport());
		parameters.put("direktniUkupnoParametar", direktniUkupnoParameter);
		parameters.put("ukupnoPosetaReport", getUkupnoPosetaReport());
		parameters.put("ukupnoPosetaParametar", ukupnoPoseteParameter);

		try {
			Image headerImage = ImageIO.read(new ByteArrayInputStream(headerImageByte));
			Image footerImage = ImageIO.read(new ByteArrayInputStream(footerImageByte));
			parameters.put("headerImage", headerImage);
			parameters.put("footerImage", footerImage);
		} catch (IOException e) {
			e.printStackTrace();
		}

		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());

		HttpHeaders headers = new HttpHeaders();
		// set the PDF format
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", "direktni.pdf");

		return new ResponseEntity<byte[]>(JasperExportManager.exportReportToPdf(jasperPrint), headers, HttpStatus.OK);
	}

	@GetMapping("/{mestoPoseteId}/xlsx/{mesecPosete}/godina/{godinaPosete}")
	public void xlsxReport(@PathVariable Long mestoPoseteId, @PathVariable Integer mesecPosete,
			@PathVariable Integer godinaPosete, HttpServletResponse response) throws JRException, IOException {

		List<DirektniView> direktniCoworkingList = direktniViewRepository
				.findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(mestoPoseteId, mesecPosete, godinaPosete);
		File file = ResourceUtils.getFile("classpath:direktniKorisnici.jrxml");
		JRBeanCollectionDataSource direktniCoworkingDataSource = new JRBeanCollectionDataSource(direktniCoworkingList);

		// subreport za direktne posete
		List<DirektniUkupnoView> direktniUkupnoList = direktniUkupnoViewRepository
				.findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(mestoPoseteId, mesecPosete, godinaPosete);
		JRBeanCollectionDataSource ukupnoDataSource = new JRBeanCollectionDataSource(direktniUkupnoList);

		Map<String, Object> direktniUkupnoParameter = new HashMap<>();
		direktniUkupnoParameter.put("ukupnoDataset", ukupnoDataSource);

		// subreport za ukupne posete
		List<UkupnoPosetaView> ukupnoPosetaList = ukupnoPosetaViewRepository
				.findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(mestoPoseteId, mesecPosete, godinaPosete);
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

		JRXlsxExporter exporter = new JRXlsxExporter();
		SimpleXlsxReportConfiguration reportConfigXLS = new SimpleXlsxReportConfiguration();
		reportConfigXLS.setSheetNames(new String[] { "Direktni korisnici" });
		exporter.setConfiguration(reportConfigXLS);
		exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment; filename=\"direktni.xlsx\"");
		exporter.exportReport();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
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
