package com.foodingmachine.backend.assembler;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.springframework.stereotype.Component;

import com.foodingmachine.backend.controller.FoodController;
import com.foodingmachine.backend.model.Food;

@Component
public class FoodModelAssembler implements RepresentationModelAssembler<Food, EntityModel<Food>> {

	@Override
	public EntityModel<Food> toModel(Food food) {
		return EntityModel.of(food,
				linkTo(methodOn(FoodController.class).one(food.getId())).withSelfRel(),
				linkTo(methodOn(FoodController.class).all()).withRel("foods"));
	}

}
