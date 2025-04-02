package com.opens.view;

import java.time.Duration;
import java.time.LocalTime;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from dogadjaji_total_view")
public class DogadjajiTotalView {

	@Id
	private Long id_ukupno;
    private Long mesec;
    private Long godina;
    private String vrsta;
    private Long ukupno_aktivnosti;
    private String ukupno_sati;
    private Long ukupno_m;
    private Long ukupno_z;
    private Long ukupno_dr;
    private Long ukupno_petnaest_devetnaest_m;
    private Long ukupno_dvadeset_dvadesetpet_m;
    private Long ukupno_dvadesetsest_trideset_m;
    private Long ukupno_tridesetplus_m;
    private Long ukupno_petnaest_devetnaest_z;
    private Long ukupno_dvadeset_dvadesetpet_z;
    private Long ukupno_dvadesetsest_trideset_z;
    private Long ukupno_tridesetplus_z;
    private Long ukupno_petnaest_devetnaest_dr;
    private Long ukupno_dvadeset_dvadesetpet_dr;
    private Long ukupno_dvadesetsest_trideset_dr;
    private Long ukupno_tridesetplus_dr;
    private Long ukupno_prigradsko_naselje_m;
    private Long ukupno_prigradsko_naselje_z;
    private Long ukupno_prigradsko_naselje_dr;
	
    public Long getId_ukupno() {
		return id_ukupno;
	}
	public Long getMesec() {
		return mesec;
	}
	public Long getGodina() {
		return godina;
	}
	public String getVrsta() {
		return vrsta;
	}
	public Long getUkupno_aktivnosti() {
		return ukupno_aktivnosti;
	}
	public String getUkupno_sati() {
		return ukupno_sati;
	}
	public Long getUkupno_m() {
		return ukupno_m;
	}
	public Long getUkupno_z() {
		return ukupno_z;
	}
	public Long getUkupno_dr() {
		return ukupno_dr;
	}
	public Long getUkupno_petnaest_devetnaest_m() {
		return ukupno_petnaest_devetnaest_m;
	}
	public Long getUkupno_dvadeset_dvadesetpet_m() {
		return ukupno_dvadeset_dvadesetpet_m;
	}
	public Long getUkupno_dvadesetsest_trideset_m() {
		return ukupno_dvadesetsest_trideset_m;
	}
	public Long getUkupno_tridesetplus_m() {
		return ukupno_tridesetplus_m;
	}
	public Long getUkupno_petnaest_devetnaest_z() {
		return ukupno_petnaest_devetnaest_z;
	}
	public Long getUkupno_dvadeset_dvadesetpet_z() {
		return ukupno_dvadeset_dvadesetpet_z;
	}
	public Long getUkupno_dvadesetsest_trideset_z() {
		return ukupno_dvadesetsest_trideset_z;
	}
	public Long getUkupno_tridesetplus_z() {
		return ukupno_tridesetplus_z;
	}
	public Long getUkupno_petnaest_devetnaest_dr() {
		return ukupno_petnaest_devetnaest_dr;
	}
	public Long getUkupno_dvadeset_dvadesetpet_dr() {
		return ukupno_dvadeset_dvadesetpet_dr;
	}
	public Long getUkupno_dvadesetsest_trideset_dr() {
		return ukupno_dvadesetsest_trideset_dr;
	}
	public Long getUkupno_tridesetplus_dr() {
		return ukupno_tridesetplus_dr;
	}
	public Long getUkupno_prigradsko_naselje_m() {
		return ukupno_prigradsko_naselje_m;
	}
	public Long getUkupno_prigradsko_naselje_z() {
		return ukupno_prigradsko_naselje_z;
	}
	public Long getUkupno_prigradsko_naselje_dr() {
		return ukupno_prigradsko_naselje_dr;
	}
	
    
}
