package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from DIREKTNI_UKUPNO_COWORKING_VIEW")
public class DirektniUkupnoCoworkingView {

	@Id
	private Long id;
	private Integer mesecPosete;
	private Integer godinaPosete;
	private Long mestoPoseteId;
	private String opsegGodina;
	private Integer ukupnoMusko;
	private Integer ukupnoZensko;
	private Integer ukupnoDrugo;

	public Long getId() {
		return id;
	}

	public Integer getMesecPosete() {
		return mesecPosete;
	}

	public Integer getGodinaPosete() {
		return godinaPosete;
	}

	public Long getMestoPoseteId() {
		return mestoPoseteId;
	}

	public String getOpsegGodina() {
		return opsegGodina;
	}

	public Integer getUkupnoMusko() {
		return ukupnoMusko;
	}

	public Integer getUkupnoZensko() {
		return ukupnoZensko;
	}

	public Integer getUkupnoDrugo() {
		return ukupnoDrugo;
	}

}
