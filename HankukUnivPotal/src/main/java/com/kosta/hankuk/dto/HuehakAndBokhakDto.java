package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.HuehakAndBokhak;
import com.kosta.hankuk.entity.Student;

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
public class HuehakAndBokhakDto {
	private Integer habNo;
	private String stdNo;
	private String status;
	private String type;
	private String appSem;
	
	public HuehakAndBokhak toLeaveAndReturn() {
		return HuehakAndBokhak.builder()
				.habNo(habNo)
				.student(Student.builder().stdNo(stdNo).build())
				.status(status)
				.type(type)
				.appSem(appSem)
				.build();
	}
}
