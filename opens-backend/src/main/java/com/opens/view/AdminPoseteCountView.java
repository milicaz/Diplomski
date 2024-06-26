package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from ADMIN_POSETE_COUNT_VIEW")
public class AdminPoseteCountView {

	@Id
	private Long mestoPoseteId;
	private String nazivMesta;
	private Long brojPoseta;

	public Long getMestoPoseteId() {
		return mestoPoseteId;
	}

	public String getNazivMesta() {
		return nazivMesta;
	}

	public Long getBrojPoseta() {
		return brojPoseta;
	}

}
