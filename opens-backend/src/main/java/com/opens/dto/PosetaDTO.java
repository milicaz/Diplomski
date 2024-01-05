package com.opens.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class PosetaDTO {

	private LocalDate datumPosete;
	private LocalTime vremePosete;
	private Long mestoPoseteID;
	private Long posetilacID;

	public PosetaDTO() {
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

}
