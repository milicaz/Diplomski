package com.opens.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "profilne_slike")
public class ProfilnaSlika {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "tip_slike")
	private String tipSlike;
	@Basic(fetch = FetchType.LAZY)
	@Lob
	@Column(name = "profilna_slika")
//	@JsonIgnore
	private byte[] profilnaSlika;
	@OneToOne
	@JoinColumn(name = "posetilac_id")
	private Posetilac posetilac;

	public ProfilnaSlika() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipSlike() {
		return tipSlike;
	}

	public void setTipSlike(String tipSlike) {
		this.tipSlike = tipSlike;
	}

	public byte[] getProfilnaSlika() {
		return profilnaSlika;
	}

	public void setProfilnaSlika(byte[] profilnaSlika) {
		this.profilnaSlika = profilnaSlika;
	}

	public Posetilac getPosetilac() {
		return posetilac;
	}

	public void setPosetilac(Posetilac posetilac) {
		this.posetilac = posetilac;
	}

}
