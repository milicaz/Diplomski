package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from POSETE_OMLADINSKI_VIEW")
public class PoseteOmladinskiView {
	
	@Id
	private Long id;
	private Long posetilacId;
	private String ime;
	private String prezime;
	private Integer godine;
	private String nazivMestaPosete;
	private Integer mesecPosete;
	private Integer godinaPosete;
	private Integer godisnjiBrojPoseta;
	private Integer mesecniBrojPoseta;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPosetilacId() {
		return posetilacId;
	}

	public void setPosetilacId(Long posetilacId) {
		this.posetilacId = posetilacId;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Integer getGodine() {
		return godine;
	}

	public void setGodine(Integer godine) {
		this.godine = godine;
	}

	public String getNazivMestaPosete() {
		return nazivMestaPosete;
	}

	public void setNazivMestaPosete(String nazivMestaPosete) {
		this.nazivMestaPosete = nazivMestaPosete;
	}

	public Integer getMesecPosete() {
		return mesecPosete;
	}

	public void setMesecPosete(Integer mesecPosete) {
		this.mesecPosete = mesecPosete;
	}

	public Integer getGodinaPosete() {
		return godinaPosete;
	}

	public void setGodinaPosete(Integer godinaPosete) {
		this.godinaPosete = godinaPosete;
	}

	public Integer getGodisnjiBrojPoseta() {
		return godisnjiBrojPoseta;
	}

	public void setGodisnjiBrojPoseta(Integer godisnjiBrojPoseta) {
		this.godisnjiBrojPoseta = godisnjiBrojPoseta;
	}

	public Integer getMesecniBrojPoseta() {
		return mesecniBrojPoseta;
	}

	public void setMesecniBrojPoseta(Integer mesecniBrojPoseta) {
		this.mesecniBrojPoseta = mesecniBrojPoseta;
	}

}
