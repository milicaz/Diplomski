package com.opens.dto;

import java.util.List;

import com.opens.model.Oprema;

public class PosetaDTO {

	private Long mestoPoseteID;
	private Long posetilacID;
	private List<Oprema> oprema;

	public PosetaDTO() {
	}

	public Long getMestoPoseteID() {
		return mestoPoseteID;
	}

	public void setMestoPoseteID(Long mestoPoseteID) {
		this.mestoPoseteID = mestoPoseteID;
	}

	public Long getPosetilacID() {
		return posetilacID;
	}

	public void setPosetilacID(Long posetilacID) {
		this.posetilacID = posetilacID;
	}

	public List<Oprema> getOprema() {
		return oprema;
	}

	public void setOprema(List<Oprema> oprema) {
		this.oprema = oprema;
	}

}
