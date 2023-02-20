package com.foodingmachine.backend.exception.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.foodingmachine.backend.exception.FoodNotFoundException;

@ControllerAdvice
public class FoodNotFoundAdvice {
	@ResponseBody
	@ExceptionHandler(FoodNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String foodNotFoundHandler(FoodNotFoundException ex) {
		return ex.getMessage();
	}
}
