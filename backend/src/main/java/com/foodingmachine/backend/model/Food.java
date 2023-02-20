package com.foodingmachine.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Food {
	private @Id @GeneratedValue Long id;
	private String name;
	private String description;
	private Double price;
	
	Food() { }
	
	Food (String name, String description, Double price) {
		this.name = name;
		this.description = description;
		this.price = price;
	}
}
