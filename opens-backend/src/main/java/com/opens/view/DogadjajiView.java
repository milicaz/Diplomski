package com.opens.view;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;
import org.springframework.data.annotation.Reference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from dogadjaji_view")
public class DogadjajiView {
	
	@Id
	private Long id;
	private String naziv_aktivnosti;
	private Long mesec;
	private Integer godina;
	private String ime_odgovorne_osobe;
	private Long m;
	private Long z;
	private Long dr;
	private Long petnaest_devetnaest_m;
	private Long dvadeset_dvadesetpet_m;
	private Long dvadesetsest_trideset_m;
	private Long tridesetplus_m;
	private Long petnaest_devetnaest_z;
	private Long dvadeset_dvadesetpet_z;
	private Long dvadesetsest_trideset_z;
	private Long tridesetplus_z;
	private Long petnaest_devetnaest_dr;
	private Long dvadeset_dvadesetpet_dr;
	private Long dvadesetsest_trideset_dr;
	private Long tridesetplus_dr;
	private LocalTime trajanje_aktivnosti;
	private Long prigradsko_naselje_m;
	private Long prigradsko_naselje_z;
	private Long prigradsko_naselje_dr;
	private String vrsta;
	private LocalDate datum;
	public Long getId() {
		return id;
	}
	public String getNaziv_aktivnosti() {
		return naziv_aktivnosti;
	}
	public Long getMesec() {
		return mesec;
	}
	public Integer getGodina() {
		return godina;
	}
	public String getIme_odgovorne_osobe() {
		return ime_odgovorne_osobe;
	}
	public Long getM() {
		return m;
	}
	public Long getZ() {
		return z;
	}
	public Long getDr() {
		return dr;
	}
	public Long getPetnaest_devetnaest_m() {
		return petnaest_devetnaest_m;
	}
	public Long getDvadeset_dvadesetpet_m() {
		return dvadeset_dvadesetpet_m;
	}
	public Long getDvadesetsest_trideset_m() {
		return dvadesetsest_trideset_m;
	}
	public Long getTridesetplus_m() {
		return tridesetplus_m;
	}
	public Long getPetnaest_devetnaest_z() {
		return petnaest_devetnaest_z;
	}
	public Long getDvadeset_dvadesetpet_z() {
		return dvadeset_dvadesetpet_z;
	}
	public Long getDvadesetsest_trideset_z() {
		return dvadesetsest_trideset_z;
	}
	public Long getTridesetplus_z() {
		return tridesetplus_z;
	}
	public Long getPetnaest_devetnaest_dr() {
		return petnaest_devetnaest_dr;
	}
	public Long getDvadeset_dvadesetpet_dr() {
		return dvadeset_dvadesetpet_dr;
	}
	public Long getDvadesetsest_trideset_dr() {
		return dvadesetsest_trideset_dr;
	}
	public Long getTridesetplus_dr() {
		return tridesetplus_dr;
	}
	public LocalTime getTrajanje_aktivnosti() {
		return trajanje_aktivnosti;
	}
	public Long getPrigradsko_naselje_m() {
		return prigradsko_naselje_m;
	}
	public Long getPrigradsko_naselje_z() {
		return prigradsko_naselje_z;
	}
	public Long getPrigradsko_naselje_dr() {
		return prigradsko_naselje_dr;
	}
	public String getVrsta() {
		return vrsta;
	}
	public LocalDate getDatum() {
		return datum;
	}
}
