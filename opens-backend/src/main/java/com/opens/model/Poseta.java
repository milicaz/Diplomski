package com.opens.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "posete")
public class Poseta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "datum_posete")
	@Temporal(TemporalType.DATE)
	private LocalDate datumPosete;
	@Column(name = "vreme_posete")
	@Temporal(TemporalType.TIME)
	private LocalTime vremePosete;
	@ManyToOne
	@JoinColumn(name = "mesto_posete_id", referencedColumnName = "id")
	private MestoPosete mestoPosete;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "posetilac_id", referencedColumnName = "id")
	private Posetilac posetilac;

	public Poseta() {

	}

	public Poseta(LocalDate datumPosete, LocalTime vremePosete, MestoPosete mestoPosete, Posetilac posetilac) {
		super();
		this.datumPosete = datumPosete;
		this.vremePosete = vremePosete;
		this.mestoPosete = mestoPosete;
		this.posetilac = posetilac;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDatumPosete() {
		return datumPosete;
	}

	public void setDatumPosete(LocalDate datumPosete) {
		this.datumPosete = datumPosete;
	}

	public LocalTime getVremePosete() {
		return vremePosete;
	}

	public void setVremePosete(LocalTime vremePosete) {
		this.vremePosete = vremePosete;
	}

	public MestoPosete getMestoPosete() {
		return mestoPosete;
	}

	public void setMestoPosete(MestoPosete mestoPosete) {
		this.mestoPosete = mestoPosete;
	}

	public Posetilac getPosetilac() {
		return posetilac;
	}

	public void setPosetilac(Posetilac posetilac) {
		this.posetilac = posetilac;
	}

}
