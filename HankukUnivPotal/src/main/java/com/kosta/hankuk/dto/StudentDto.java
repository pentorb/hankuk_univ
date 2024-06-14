package com.kosta.hankuk.dto;

import java.util.Date;

import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Professor;
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
public class StudentDto implements UserDto {
	private String id;
	private String password;
	private String name;
	private String tel;
	private String addr;
	private String detailAddr;
	private String postCode;
	private String gender;
	private Date birthday;
	private String email;
	private String emailDo;
	private String status;
	private String profile;
	private Integer finCredit;
	private Integer finSem;
	private String profNo;
	private String profName;
	private String majName;
	private String majCd;
	
	public Student toStudent() {
		return Student.builder()
				.stdNo(id)
				.password(password)
				.name(name)
				.tel(tel)
				.addr(addr)
				.detailAddr(detailAddr)
				.postCode(postCode)
				.gender(gender)
				.birthday(birthday)
				.email(email)
				.emailDo(emailDo)
				.status(status)
				.profile(profile)
				.finCredit(finCredit)
				.finSem(finSem)
				.professor(profNo!=null? Professor.builder().profNo(profNo).build() : null)
				.major(majCd!=null? Major.builder().majCd(majCd).build(): null)
				.build();
	}
}
