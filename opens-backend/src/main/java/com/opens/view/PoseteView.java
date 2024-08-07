package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from POSETE_VIEW")
public class PoseteView {

	@Id
	private Long id;
	private Long posetilacId;
	private String ime;
	private String prezime;
	private Integer godine;
	private Long mestoPoseteId;
	private Integer mesecPosete;
	private Integer godinaPosete;
	private Integer mesecniBrojPoseta;
	private Integer godisnjiBrojPoseta;
	private Integer totalPosete;
	private String mesecnoProvedenoVreme;
	private String godisnjeProvedenoVreme;
	private String totalnoProvedenoVreme;

	public Long getId() {
		return id;
	}

	public Long getPosetilacId() {
		return posetilacId;
	}

	public String getIme() {
		return ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public Integer getGodine() {
		return godine;
	}
	
	public Long getMestoPoseteId() {
		return mestoPoseteId;
	}

	public Integer getMesecPosete() {
		return mesecPosete;
	}

	public Integer getGodinaPosete() {
		return godinaPosete;
	}

	public Integer getGodisnjiBrojPoseta() {
		return godisnjiBrojPoseta;
	}

	public Integer getMesecniBrojPoseta() {
		return mesecniBrojPoseta;
	}

	public Integer getTotalPosete() {
		return totalPosete;
	}

	public String getMesecnoProvedenoVreme() {
		return mesecnoProvedenoVreme;
	}

	public String getGodisnjeProvedenoVreme() {
		return godisnjeProvedenoVreme;
	}

	public String getTotalnoProvedenoVreme() {
		return totalnoProvedenoVreme;
	}

}
