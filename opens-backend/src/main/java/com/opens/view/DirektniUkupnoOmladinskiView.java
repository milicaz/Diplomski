package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from DIREKTNI_UKUPNO_COWORKING_VIEW")
public class DirektniUkupnoOmladinskiView {
	
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

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getMesecPosete() {
		return mesecPosete;
	}

	public void setMesecPosete(Integer mesecPosete) {
		this.mesecPosete = mesecPosete;
	}

	public Integer getGodinaPosete() {
		return godinaPosete;
	}

	public void setGodinaPosete(Integer godinaPosete) {
		this.godinaPosete = godinaPosete;
	}

	public Long getMestoPoseteId() {
		return mestoPoseteId;
	}

	public void setMestoPoseteId(Long mestoPoseteId) {
		this.mestoPoseteId = mestoPoseteId;
	}

	public String getOpsegGodina() {
		return opsegGodina;
	}

	public void setOpsegGodina(String opsegGodina) {
		this.opsegGodina = opsegGodina;
	}

	public Integer getUkupnoMusko() {
		return ukupnoMusko;
	}

	public void setUkupnoMusko(Integer ukupnoMusko) {
		this.ukupnoMusko = ukupnoMusko;
	}

	public Integer getUkupnoZensko() {
		return ukupnoZensko;
	}

	public void setUkupnoZensko(Integer ukupnoZensko) {
		this.ukupnoZensko = ukupnoZensko;
	}

	public Integer getUkupnoDrugo() {
		return ukupnoDrugo;
	}

	public void setUkupnoDrugo(Integer ukupnoDrugo) {
		this.ukupnoDrugo = ukupnoDrugo;
	}

}
