package com.opens.dto;

import java.util.List;

import com.opens.model.Oprema;

public class PosetaDTO {

	private Long mestoPoseteID;
	private String posetilacEmail;
	private List<Oprema> oprema;

	public PosetaDTO() {
	}

	public Long getMestoPoseteID() {
		return mestoPoseteID;
	}

	public void setMestoPoseteID(Long mestoPoseteID) {
		this.mestoPoseteID = mestoPoseteID;
	}

	public String getPosetilacEmail() {
		return posetilacEmail;
	}

	public void setPosetilacEmail(String posetilacEmail) {
		this.posetilacEmail = posetilacEmail;
	}

	public List<Oprema> getOprema() {
		return oprema;
	}

	public void setOprema(List<Oprema> oprema) {
		this.oprema = oprema;
	}

}
