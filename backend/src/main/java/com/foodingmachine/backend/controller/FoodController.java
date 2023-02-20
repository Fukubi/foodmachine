package com.foodingmachine.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.foodingmachine.backend.assembler.FoodModelAssembler;
import com.foodingmachine.backend.exception.FoodNotFoundException;
import com.foodingmachine.backend.model.Food;
import com.foodingmachine.backend.repository.FoodRepository;

@RestController
public class FoodController {
	private final FoodRepository foodRepository;
	private final FoodModelAssembler assembler;

	FoodController(FoodRepository foodRepository, FoodModelAssembler assembler) {
		this.foodRepository = foodRepository;
		this.assembler = assembler;
	}

	@GetMapping("/foods")
	public CollectionModel<EntityModel<Food>> all() {
		List<EntityModel<Food>> foods = foodRepository.findAll().stream().map(assembler::toModel)
				.collect(Collectors.toList());

		return CollectionModel.of(foods, linkTo(methodOn(FoodController.class).all()).withSelfRel());
	}
	
	@GetMapping("/foods/{id}")
	public EntityModel<Food> one(@PathVariable Long id) {
		Food food = foodRepository.findById(id).orElseThrow(() -> new FoodNotFoundException(id));
		
		return assembler.toModel(food);
	}
	
	@PostMapping("/foods")
	public ResponseEntity<?> newFood(@RequestBody Food food) {
		EntityModel<Food> foodEntity = assembler.toModel(foodRepository.save(food));
		
		return ResponseEntity.created(foodEntity.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(foodEntity);
	}
	
	@PutMapping("/foods/{id}")
	public ResponseEntity<?> updateFood(@RequestBody Food newFood, @PathVariable Long id) {
		Food updatedFood = foodRepository.findById(id).map(food -> {
			food.setName(newFood.getName());
			food.setPrice(newFood.getPrice());
			food.setDescription(newFood.getDescription());
			
			return foodRepository.save(food);
		}).orElseGet(() -> {
			newFood.setId(id);
			return foodRepository.save(newFood);
		});
		
		EntityModel<Food> foodEntity = assembler.toModel(updatedFood);
		
		return ResponseEntity.created(foodEntity.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(foodEntity);
	}
	
	@DeleteMapping("/foods/{id}")
	public ResponseEntity<?> deleteFood(@PathVariable Long id) {
		foodRepository.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
}
