package com.opens.view;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from ucesnici_view")
public class UcesniciView {

	@Id
	private Long id;
	private Long doznaka;
	private String naziv_aktivnosti;
	private String organizacija;
	private LocalDate datum;
	private String mesto;
	private LocalTime pocetak;
	private LocalTime kraj;
	private String ime;
	private String prezime;
	private String pol;
	private Long godine;
	private String mesto_boravista;
	private String uc_organizacija;
	private String telefon;
	private String email;
	
	
	public Long getId() {
		return id;
	}
	public String getNaziv_aktivnosti() {
		return naziv_aktivnosti;
	}
	public String getOrganizacija() {
		return organizacija;
	}
	public LocalDate getDatum() {
		return datum;
	}
	public String getMesto() {
		return mesto;
	}
	public LocalTime getPocetak() {
		return pocetak;
	}
	public LocalTime getKraj() {
		return kraj;
	}
	public String getIme() {
		return ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public String getPol() {
		return pol;
	}
	public Long getGodine() {
		return godine;
	}
	public String getMesto_boravista() {
		return mesto_boravista;
	}
	public String getUc_organizacija() {
		return uc_organizacija;
	}
	public String getTelefon() {
		return telefon;
	}
	public String getEmail() {
		return email;
	}
	public Long getDoznaka() {
		return doznaka;
	}
	
	
	
}
