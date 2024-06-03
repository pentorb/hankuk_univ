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

import com.kosta.hankuk.dto.SubjectDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Subject {
	@Id
	private String subCd;
	@Column
	private String name;
	@Column
	private String type;
	@Column
	private Integer targetGrd;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="majCd")
	private Major major;
	
	@OneToMany(mappedBy="subject", fetch=FetchType.LAZY)
	private List<Lecture> lectureList = new ArrayList<>();
	
	public SubjectDto toSubjectDto() {
		return SubjectDto.builder()
				.subCd(subCd)
				.name(name)
				.type(type)
				.targetGrd(targetGrd)
				.majCd(major.getMajCd())
				.build();
	}
}
