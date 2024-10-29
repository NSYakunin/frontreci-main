// services/recipeService.ts

import axios from 'axios'
import { Recipe, NewRecipe } from '../types/types'

const API_URL = 'http://localhost:5103' // Замените на ваш реальный URL бэкенда

export const fetchRecipes = async (
  page: number,
  pageSize: number
): Promise<{ recipes: Recipe[]; totalRecipes: number }> => {
  try {
    const response = await axios.get(`${API_URL}/recipes`, {
      params: { page, pageSize },
    });
    return {
      recipes: response.data.recipes,
      totalRecipes: response.data.totalRecipes,
    };
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
};

export const searchRecipes = async (
	query: string,
	page: number,
	pageSize: number
): Promise<{ recipes: Recipe[]; totalRecipes: number }> => {
	const response = await axios.get(`${API_URL}/recipes/search`, {
		params: { query, page, pageSize },
	})
	return {
		recipes: response.data.recipes,
		totalRecipes: response.data.totalRecipes,
	}
}

export const createRecipe = async (newRecipe: NewRecipe): Promise<Recipe> => {
	try {
		const response = await axios.post(`${API_URL}/recipes`, newRecipe)
		return response.data
	} catch (error) {
		console.error('Ошибка при создании рецепта:', error)
		throw error
	}
}

export const updateRecipe = async (
	id: number,
	updatedRecipe: NewRecipe
): Promise<void> => {
	try {
		await axios.put(`${API_URL}/recipes/${id}`, updatedRecipe)
	} catch (error) {
		console.error('Ошибка при обновлении рецепта:', error)
		throw error // Можно повторно выбросить ошибку, если нужно
	}
}

export const deleteRecipe = async (id: number): Promise<void> => {
	await axios.delete(`${API_URL}/recipes/${id}`)
}

// services/recipeService.ts

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
	const response = await axios.get(`${API_URL}/recipes/${id}`)
	return response.data
}
