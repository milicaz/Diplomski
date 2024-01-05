package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "opreme")
public class Oprema {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@OneToOne
	@JoinColumn(name = "tip_opreme_id")
	private TipOpreme tipOpreme;
	@Column(name = "serijski_broj")
	private String serijskiBroj;

	public Oprema() {

	}

	public Oprema(TipOpreme tipOpreme, String serijskiBroj) {
		super();
		this.tipOpreme = tipOpreme;
		this.serijskiBroj = serijskiBroj;
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

}
