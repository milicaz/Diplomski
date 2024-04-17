package com.opens.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@Column(name = "vreme_odjave")
	@Temporal(TemporalType.TIME)
	private LocalTime vremeOdjave;
	@ManyToOne
	@JoinColumn(name = "mesto_posete_id", referencedColumnName = "id")
	private MestoPosete mestoPosete;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "posetilac_id", referencedColumnName = "id")
	private Posetilac posetilac;

	@OneToMany(cascade = CascadeType.DETACH, orphanRemoval = false)
	private List<Oprema> oprema;

	public Poseta() {

	}

	public Poseta(LocalDate datumPosete, LocalTime vremePosete, LocalTime vremeOdjave, MestoPosete mestoPosete,
			Posetilac posetilac, List<Oprema> oprema) {
		super();
		this.datumPosete = datumPosete;
		this.vremePosete = vremePosete;
		this.vremeOdjave = vremeOdjave;
		this.mestoPosete = mestoPosete;
		this.posetilac = posetilac;
		this.oprema = oprema;
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

	public LocalTime getVremeOdjave() {
		return vremeOdjave;
	}

	public void setVremeOdjave(LocalTime vremeOdjave) {
		this.vremeOdjave = vremeOdjave;
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

	public List<Oprema> getOprema() {
		return oprema;
	}

	public void setOprema(List<Oprema> oprema) {
		this.oprema = oprema;
	}

}
