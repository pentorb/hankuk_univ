package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Professor;

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
public class ProfessorDto implements UserDto {
	private String id;
	private String password;
	private String name;
	private String gender;
	private String profile;
	private String position;
	private String addr;
	private String detailAddr;
	private String postCode;
	private Date birthday;
	private String tel;
	private String email;
	private String emailDo;
	private Date joinDt;
	private String majCd;
	private String majName;
	
	public Professor toProfessor() {
		return Professor.builder()
				.profNo(id)
				.password(password)
				.name(name)
				.gender(gender)
				.profile(profile)
				.position(position)
				.addr(addr)
				.detailAddr(detailAddr)
				.postCode(postCode)
				.birthday(birthday)
				.tel(tel)
				.email(email)
				.emailDo(emailDo)
				.joinDt(joinDt)
				.major(majCd!=null? Major.builder().majCd(majCd).build(): null)
				.build();
	}
}
