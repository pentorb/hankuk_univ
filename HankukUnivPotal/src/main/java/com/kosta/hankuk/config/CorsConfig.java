package com.kosta.hankuk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.kosta.hankuk.config.jwt.JwtProperties;

@Configuration
public class CorsConfig {
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOriginPattern("*");
		config.addAllowedHeader("*"); // Access-Control-Allow-Headers
		config.addAllowedMethod("*"); // Access-Control-Allow-Method
		config.addExposedHeader(JwtProperties.HEADER_STRING);
		source.registerCorsConfiguration("/*", config);
		source.registerCorsConfiguration("/*/*", config);
		return new CorsFilter(source);
	}

}
