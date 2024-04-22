package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from DIREKTNI_COWORKING_VIEW")
public class DirektniCoworkingView {

	@Id
	private Long id;
	private String ime;
	private String prezime;
	private Integer godine;
	private String rod;
	private Integer mesecPosete;
	private Integer godinaPosete;
	private String nazivMesta;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getRod() {
		return rod;
	}

	public void setRod(String rod) {
		this.rod = rod;
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

	public String getNazivMesta() {
		return nazivMesta;
	}

	public void setNazivMesta(String nazivMesta) {
		this.nazivMesta = nazivMesta;
	}

}
