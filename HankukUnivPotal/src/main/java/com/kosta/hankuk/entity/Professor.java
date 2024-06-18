package com.kosta.hankuk.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.ProfessorDto;

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
public class Professor implements User{
	@Id
	private String profNo;
	
	@Column
	@ColumnDefault("1234")
	private String password;
	
	@Column
	private String name;
	@Column
	private String gender;
	@Column
	private String profile;
	@Column
	private String position;
	@Column
	private String addr;
	@Column
	private String detailAddr;
	@Column
	private String postCode;
	@Column
	private Date birthday;
	@Column
	private String tel;
	@Column
	private String email;
	@Column
	private String emailDo;
	@Column
	private Date joinDt;
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="majCd")
	private Major major;
	
	// 교수 한 명이 담당하는 학생 리스트
	@OneToMany(mappedBy="professor", fetch=FetchType.LAZY)
	private List<Student> stdList = new ArrayList<>();
	
	// 교수가 가진 강의 리스트
	@OneToMany(mappedBy="professor", fetch=FetchType.LAZY)
	private List<Lecture> lectList = new ArrayList<>();
	
	public ProfessorDto toProfessorDto() {
		return ProfessorDto.builder()
				.id(profNo)
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
				.majCd(major.getMajCd())
				.majName(major.getName())
				.build();
	}
	
	@Override
	public String getId() {
		return profNo;
	}
	
	@Override
	public String getPassword() {
		return password;
	}
	
	@Override
	public String getName() {
		return name;
	}
	
	@Override
	public void setPassword(String enteredPassword) {
		this.password = enteredPassword;
	}
}
