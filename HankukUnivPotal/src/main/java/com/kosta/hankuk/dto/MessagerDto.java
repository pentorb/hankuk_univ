package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Messager;

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
public class MessagerDto {
	private Integer msgNo;
	private String sendId;
	private String recvId;
	private String title;
	private String content;
	private Date writeDt;
	
	public Messager toMessager() {
		return Messager.builder()
					.msgNo(msgNo)
					.sendId(sendId)
					.recvId(recvId)
					.title(title)
					.content(content)
					.writeDt(writeDt)
					.build();
	}
}
