package com.foodingmachine.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodingmachine.backend.model.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {

}
