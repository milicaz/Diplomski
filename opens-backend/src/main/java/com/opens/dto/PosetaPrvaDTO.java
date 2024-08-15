package com.opens.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class PosetaPrvaDTO {

	private Long mestoPoseteID;
	private String posetilacEmail;
	private LocalDate datumPosete;
	private LocalTime vremePosete;
	private LocalTime vremeOdjave;

	public PosetaPrvaDTO() {}

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

}
