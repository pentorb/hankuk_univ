package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

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
public class Calendar {
	@Id
	private String calNo;
	@Column
	private String title;
	@Column
	private String calStartDt;
	@Column
	private String calEndDt;
	@Column
	private String div;
	@Column
	private String writer;
}
