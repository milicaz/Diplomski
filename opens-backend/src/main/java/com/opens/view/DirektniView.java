package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from DIREKTNI_VIEW")
public class DirektniView {

	@Id
	private Long id;
	private String ime;
	private String prezime;
	private Integer godine;
	private String rod;
	private Long mestoPoseteId;
	private Integer mesecPosete;
	private Integer godinaPosete;
	private String nazivMesta;

	public Long getId() {
		return id;
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

	public String getRod() {
		return rod;
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

	public String getNazivMesta() {
		return nazivMesta;
	}

}
