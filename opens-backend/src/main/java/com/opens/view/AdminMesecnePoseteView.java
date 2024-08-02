package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from ADMIN_MESECNE_POSETE_VIEW")
public class AdminMesecnePoseteView {

	@Id
	private Long id;
	private Integer mesec;
	private Integer godina;
	private Integer mesecniBroj;
	private Long mestoPoseteId;
	private String nazivMesta;

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
	
	public Long getMestoPoseteId() {
		return mestoPoseteId;
	}

	public String getNazivMesta() {
		return nazivMesta;
	}

}
