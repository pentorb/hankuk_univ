package com.kosta.hankuk.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.ColleageDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/*
    단과코드(예시)
	--------
	ENG : 공대
	LA : 문과
	EDU : 사대
	SS : 사과대
	AD : 예대
	SNT : 생나대
	MN : 경상대
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Colleage {
	@Id
	private String colCd;
	@Column
	private String name;
	
	@OneToMany(mappedBy="colleage", fetch=FetchType.LAZY)
	private List<Major> majorList = new ArrayList<>();
	
	public ColleageDto toColleageDto() {
		return ColleageDto.builder()
				.colCd(colCd)
				.name(name)
				.build();
	}
	
}
