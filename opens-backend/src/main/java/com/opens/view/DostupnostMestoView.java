package com.opens.view;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from dostupnost_mesto_view")
public class DostupnostMestoView {
	
	@Id
	private Long id;
	private Long slobodna_mesta;

	public Long getSlobodna_mesta() {
		return slobodna_mesta;
	}

	public void setSlobodna_mesta(Long slobodna_mesta) {
		this.slobodna_mesta = slobodna_mesta;
	}
	
	

}
