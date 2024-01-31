package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "logoi")
public class Logo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "naziv")
	private String naziv;
	
	@Column(name = "tip")
	private String tip;
	
	@Column(name = "pic_byte")
	private Byte[] picByte;

	public Logo() {
		super();
	}

	public Logo(String naziv, String tip, Byte[] picByte) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.picByte = picByte;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public Byte[] getPicByte() {
		return picByte;
	}

	public void setPicByte(Byte[] picByte) {
		this.picByte = picByte;
	}

}
