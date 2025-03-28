package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from ADMIN_GODISNJE_AKTIVNOSTI_VIEW")
public class AdminGodisnjeAktivnostiView {

	@Id
	private Long vrstaId;
	private Integer godinaDogadjaja;
	private Long brojDogadjaja;
	private String nazivTipDogadjaja;

	public Long getVrstaId() {
		return vrstaId;
	}

	public Integer getGodinaDogadjaja() {
		return godinaDogadjaja;
	}

	public Long getBrojDogadjaja() {
		return brojDogadjaja;
	}

	public String getNazivTipDogadjaja() {
		return nazivTipDogadjaja;
	}

}
