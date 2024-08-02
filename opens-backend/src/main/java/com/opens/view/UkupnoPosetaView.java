package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from UKUPNO_POSETA_VIEW")
public class UkupnoPosetaView {

	@Id
	private Long id;
	private String opsegGodina;
	private Integer ukupnoMusko;
	private Integer ukupnoZensko;
	private Integer ukupnoDrugo;
	private Long mestoPoseteId;
	private String nazivMestaPosete;
	private Integer mesecPosete;
	private Integer godinaPosete;

	public Long getId() {
		return id;
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

	public Long getMestoPoseteId() {
		return mestoPoseteId;
	}

	public String getNazivMestaPosete() {
		return nazivMestaPosete;
	}

	public Integer getMesecPosete() {
		return mesecPosete;
	}

	public Integer getGodinaPosete() {
		return godinaPosete;
	}

}
