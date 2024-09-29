package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mesta_posete")
public class MestoPosete {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "naziv_mesta")
	private String nazivMesta;
	@Column(name = "ukupan_broj_mesta")
	private Integer ukupanBrojMesta;
	@Column(nullable = false)
	private boolean deleted;

	public MestoPosete() {
	}

	public MestoPosete(String nazivMesta, Integer ukupanBrojMesta) {
		super();
		this.nazivMesta = nazivMesta;
		this.ukupanBrojMesta = ukupanBrojMesta;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNazivMesta() {
		return nazivMesta;
	}

	public void setNazivMesta(String nazivMesta) {
		this.nazivMesta = nazivMesta;
	}

	public Integer getUkupanBrojMesta() {
		return ukupanBrojMesta;
	}

	public void setUkupanBrojMesta(Integer ukupanBrojMesta) {
		this.ukupanBrojMesta = ukupanBrojMesta;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

}
