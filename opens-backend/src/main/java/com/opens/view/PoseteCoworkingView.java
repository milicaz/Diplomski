package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from POSETE_COWORKING_VIEW")
public class PoseteCoworkingView {

	@Id
	private Long id;
	private Long posetilacId;
	private String ime;
	private String prezime;
	private Integer godine;
	private Integer mesecPosete;
	private Integer godinaPosete;
	private Integer mesecniBrojPoseta;
	private Integer godisnjiBrojPoseta;
	private Integer totalPosete;
	private String mesecnoProvedenoVreme;
	private String godisnjeProvedenoVreme;
	private String totalnoProvedenoVreme;

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

	public Integer getTotalPosete() {
		return totalPosete;
	}

	public void setTotalPosete(Integer totalPosete) {
		this.totalPosete = totalPosete;
	}

	public String getMesecnoProvedenoVreme() {
		return mesecnoProvedenoVreme;
	}

	public void setMesecnoProvedenoVreme(String mesecnoProvedenoVreme) {
		this.mesecnoProvedenoVreme = mesecnoProvedenoVreme;
	}

	public String getGodisnjeProvedenoVreme() {
		return godisnjeProvedenoVreme;
	}

	public void setGodisnjeProvedenoVreme(String godisnjeProvedenoVreme) {
		this.godisnjeProvedenoVreme = godisnjeProvedenoVreme;
	}

	public String getTotalnoProvedenoVreme() {
		return totalnoProvedenoVreme;
	}

	public void setTotalnoProvedenoVreme(String totalnoProvedenoVreme) {
		this.totalnoProvedenoVreme = totalnoProvedenoVreme;
	}

}
