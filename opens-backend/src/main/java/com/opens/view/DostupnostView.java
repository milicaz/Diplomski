package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from dostupnost_view")
public class DostupnostView {
	
	@Id
	private Long id;
	private String naziv_opreme;
	private Long ukupno_opreme;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNaziv_opreme() {
		return naziv_opreme;
	}
	public void setNaziv_opreme(String naziv_opreme) {
		this.naziv_opreme = naziv_opreme;
	}
	public Long getUkupno_opreme() {
		return ukupno_opreme;
	}
	public void setUkupno_opreme(Long ukupno_opreme) {
		this.ukupno_opreme = ukupno_opreme;
	}
	
	

}
