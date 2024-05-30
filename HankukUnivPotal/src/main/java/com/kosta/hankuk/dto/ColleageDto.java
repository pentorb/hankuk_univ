package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Colleage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ColleageDto {
	private String colCd;
	private String name;
	
	public Colleage toColleage() {
		return Colleage.builder()
				.colCd(colCd)
				.name(name)
				.build();
	}
}
