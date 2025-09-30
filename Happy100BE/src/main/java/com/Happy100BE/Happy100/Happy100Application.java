package com.Happy100BE.Happy100;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@MapperScan("com.Happy100BE.Happy100.mapper")
@EnableCaching
public class Happy100Application {

	public static void main(String[] args) {
		SpringApplication.run(Happy100Application.class, args);
	}

}
