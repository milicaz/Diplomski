package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from ADMIN_OMLADINSKI_MESECNE_POSETE_VIEW")
public class AdminOmladinskiMesecnePoseteView {

	@Id
	private Long id;
	private Integer mesec;
	private Integer godina;
	private Integer mesecniBroj;

	public Long getId() {
		return id;
	}

	public Integer getMesec() {
		return mesec;
	}

	public Integer getGodina() {
		return godina;
	}

	public Integer getMesecniBroj() {
		return mesecniBroj;
	}

}
