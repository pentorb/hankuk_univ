package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Subject;

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
public class SubjectDto {
	private String subCd;
	private String name;
	private String type;
	private Integer targetGrd;
	private String majCd;
    
	public Subject toSubject() {
		return Subject.builder()
				.subCd(subCd)
				.name(name)
				.type(type)
				.targetGrd(targetGrd)
				.major(Major.builder().majCd(majCd).build())
				.build();
	}
}
