package com.opens.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "uloge")
public class Uloga {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private EUloge naziv;
	
//	@OneToOne(mappedBy = "uloga")
//	private Posetilac posetilac;

	public Uloga() {
	}

	public Uloga(EUloge naziv) {
		this.naziv = naziv;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EUloge getNaziv() {
		return naziv;
	}

	public void setNaziv(EUloge naziv) {
		this.naziv = naziv;
	}

//	public Posetilac getPosetilac() {
//		return posetilac;
//	}
//
//	public void setPosetilac(Posetilac posetilac) {
//		this.posetilac = posetilac;
//	}

}
