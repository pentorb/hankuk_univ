package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Colleage;
import com.kosta.hankuk.entity.Major;

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
public class MajorDto {
	private String majCd;
	private String name;
	private String tel;
	private Integer reqGenCredit;
	private Integer reqMajCredit;
	private Integer gradCredit;
	private String colCd;
	
	public Major toMajor() {
		return Major.builder()
				.majCd(majCd)
				.name(name)
				.tel(tel)
				.reqGenCredit(reqGenCredit)
				.reqMajCredit(reqMajCredit)
				.gradCredit(gradCredit)
				.colleage(Colleage.builder().colCd(colCd).build())
				.build();
	}
}
