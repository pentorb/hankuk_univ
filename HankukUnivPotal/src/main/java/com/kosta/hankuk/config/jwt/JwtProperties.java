package com.kosta.hankuk.config.jwt;

public interface JwtProperties {
	String SECRET = "kosta"; // 우리 서버의 고유의 비밀키
	int ACCESS_EXPIARATION_TIME = 60000 * 60 * 2; // ms
	int REFRESH_EXPIARATION_TIME = 60000 * 60 * 24;
	String TOKEN_PREFIX = "Bearer ";
	String HEADER_STRING = "Authorization";
}
