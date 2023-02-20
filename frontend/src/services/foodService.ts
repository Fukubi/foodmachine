import { Food } from "../model/food";
import { api } from "../utils/api";

export function getAllFoods() {
    return api.get('/foods');
}

export function getFood(id: number) {
    return api.get(`/foods/${id}`);
}

export function saveFood(food: Food) {
    return api.post('/foods', food);
}

export function updateFood(food: Food, id: number) {
    return api.put(`/foods/${id}`, food);
}

export function deleteFood(id: number) {
    return api.delete(`/foods/${id}`);
}