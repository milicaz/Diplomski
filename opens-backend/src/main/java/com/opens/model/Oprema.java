package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "opreme")
public class Oprema {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "tip_opreme_id", referencedColumnName = "id")
	private TipOpreme tipOpreme;
	@Column(name = "serijski_broj")
	private String serijskiBroj;
	@Column(nullable = false)
	private boolean isZauzeta;
	@Column(nullable = false)
	private boolean deleted;

	public Oprema() {

	}

	public Oprema(TipOpreme tipOpreme, String serijskiBroj, Boolean isZauzeta) {
		super();
		this.tipOpreme = tipOpreme;
		this.serijskiBroj = serijskiBroj;
		this.isZauzeta = isZauzeta;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public TipOpreme getTipOpreme() {
		return tipOpreme;
	}

	public void setTipOpreme(TipOpreme tipOpreme) {
		this.tipOpreme = tipOpreme;
	}

	public String getSerijskiBroj() {
		return serijskiBroj;
	}

	public void setSerijskiBroj(String serijskiBroj) {
		this.serijskiBroj = serijskiBroj;
	}

	public boolean getIsZauzeta() {
		return isZauzeta;
	}

	public void setIsZauzeta(boolean isZauzeta) {
		this.isZauzeta = isZauzeta;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

}
