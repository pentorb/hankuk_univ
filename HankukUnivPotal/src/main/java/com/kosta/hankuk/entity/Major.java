package com.kosta.hankuk.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.MajorDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Major {
	@Id
	private String majCd;
	@Column
	private String name;
	@Column
	private String tel;
	@Column
	private Integer reqGenCredit;
	@Column
	private Integer reqMajCredit;
	@Column
	private Integer gradCredit;
	
	// 단과코드
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="colCd")
	private Colleage colleage;
	
	// 하나의 학과가 갖고 있는 강의 리스트 
	@OneToMany(mappedBy="major", fetch=FetchType.LAZY)
	private List<Subject> subList = new ArrayList<>();
	
	public MajorDto toMajorDto() {
		return MajorDto.builder()
				.majCd(majCd)
				.name(name)
				.tel(tel)
				.reqGenCredit(reqGenCredit)
				.reqMajCredit(reqMajCredit)
				.gradCredit(gradCredit)
				.colCd(colleage.getColCd())
				.build();
	}

}
