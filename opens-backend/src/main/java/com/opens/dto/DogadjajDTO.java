package com.opens.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

import com.opens.model.Organizacija;
import com.opens.model.Ucesnik;

public class DogadjajDTO {
	
	private String naziv;
	private LocalDate datum;
	private LocalTime pocetakDogadjaja;
	private LocalTime krajDogadjaja;
	private Long mestoDogadjajaId;
	private Long vrstaDogadjajaId;
	private Long organizacijaId;
	private Set<Ucesnik> ucesnici;
	
	public DogadjajDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public LocalDate getDatum() {
		return datum;
	}

	public void setDatum(LocalDate datum) {
		this.datum = datum;
	}

	public LocalTime getPocetakDogadjaja() {
		return pocetakDogadjaja;
	}

	public void setPocetakDogadjaja(LocalTime pocetakDogadjaja) {
		this.pocetakDogadjaja = pocetakDogadjaja;
	}

	public LocalTime getKrajDogadjaja() {
		return krajDogadjaja;
	}

	public void setKrajDogadjaja(LocalTime krajDogadjaja) {
		this.krajDogadjaja = krajDogadjaja;
	}

	public Long getMestoDogadjajaId() {
		return mestoDogadjajaId;
	}

	public void setMestoDogadjajaId(Long mestoDogadjajaId) {
		this.mestoDogadjajaId = mestoDogadjajaId;
	}

	public Long getVrstaDogadjajaId() {
		return vrstaDogadjajaId;
	}

	public void setVrstaDogadjajaId(Long vrstaDogadjajaId) {
		this.vrstaDogadjajaId = vrstaDogadjajaId;
	}

	public Long getOrganizacijaId() {
		return organizacijaId;
	}

	public void setOrganizacijaId(Long organizacijaId) {
		this.organizacijaId = organizacijaId;
	}

	public Set<Ucesnik> getUcesnici() {
		return ucesnici;
	}

	public void setUcesnici(Set<Ucesnik> ucesnici) {
		this.ucesnici = ucesnici;
	}

	
	
	
	
}
