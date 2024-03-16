package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from ADMIN_COWORKING_MESECNE_POSETE_VIEW")
public class AdminCoworkingMesecnePoseteView {
	
	@Id
	private Long id;
	private Integer mesec;
	private Integer godina;
	private Integer mesecniBroj;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getMesec() {
		return mesec;
	}

	public void setMesec(Integer mesec) {
		this.mesec = mesec;
	}

	public Integer getGodina() {
		return godina;
	}

	public void setGodina(Integer godina) {
		this.godina = godina;
	}

	public Integer getMesecniBroj() {
		return mesecniBroj;
	}

	public void setMesecniBroj(Integer mesecniBroj) {
		this.mesecniBroj = mesecniBroj;
	}

}
