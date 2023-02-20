package com.foodingmachine.backend.exception;

public class FoodNotFoundException extends RuntimeException {
	private static final long serialVersionUID = -2360084888081318182L;

	public FoodNotFoundException(Long id) {
		super("Could not find food " + id);
	}
}
