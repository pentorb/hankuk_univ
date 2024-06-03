package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.HuehakAndBokhakDto;

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
public class HuehakAndBokhak {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer habNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@Column
	private String status;
	
	@Column
	private String type;
	
	@Column
	private String appSem;
	
	public HuehakAndBokhakDto toLeaveAndReturnDto() {
		return HuehakAndBokhakDto.builder()
				.habNo(habNo)
				.stdNo(student.getStdNo())
				.status(status)
				.type(type)
				.appSem(appSem)
				.build();
	}
}
