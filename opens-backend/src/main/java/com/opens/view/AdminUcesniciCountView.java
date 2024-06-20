package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from ADMIN_UCESNICI_COUNT_VIEW")
public class AdminUcesniciCountView {

	@Id
	private Long tipDogadjajaId;
	private String tipDogadjaja;
	private Long brojUcesnika;

	public Long getTipDogadjajaId() {
		return tipDogadjajaId;
	}

	public String getTipDogadjaja() {
		return tipDogadjaja;
	}

	public Long getBrojUcesnika() {
		return brojUcesnika;
	}

}
