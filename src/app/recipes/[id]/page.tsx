'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Recipe, NewRecipe } from '../../../types/types'
import {
	fetchRecipeById,
	updateRecipe,
	deleteRecipe,
} from '../../../services/recipeService'
import AddRecipeForm from '../../../components/AddRecipeForm'
import axios from 'axios'

const RecipeDetail: React.FC = () => {
	const router = useRouter()
	const params = useParams()
	const id = params.id

	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		if (id) {
			const loadRecipe = async () => {
				try {
					const data = await fetchRecipeById(Number(id))
					setRecipe(data)
				} catch (error) {
					console.error('Ошибка при загрузке рецепта:', error)
				}
			}
			loadRecipe()
		}
	}, [id])

	// pages/recipes/[id]/page.tsx

	const handleUpdateRecipe = async (updatedRecipe: NewRecipe) => {
		if (id) {
			try {
				await updateRecipe(Number(id), updatedRecipe)
				setRecipe({ ...updatedRecipe, recipeID: Number(id) })
				setIsEditing(false)
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (error.response && error.response.status === 409) {
						// Обработка ошибки 409 Conflict
						alert(
							error.response.data.message ||
								'Рецепт с таким именем уже существует.'
						)
					} else {
						alert('Ошибка при обновлении рецепта.')
					}
				} else {
					console.error('Неизвестная ошибка:', error)
					alert('Произошла неизвестная ошибка.')
				}
			}
		}
	}

	const handleDeleteRecipe = async () => {
		if (id) {
			try {
				await deleteRecipe(Number(id))
				router.push('/')
			} catch (error) {
				console.error('Ошибка при удалении рецепта:', error)
			}
		}
	}

	if (!recipe) {
		return <p>Загрузка...</p>
	}

	return (
		<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
			<button onClick={() => router.push('/')}>Назад к списку рецептов</button>

			{isEditing ? (
				<AddRecipeForm
					initialRecipe={recipe}
					onSave={handleUpdateRecipe}
					onCancel={() => setIsEditing(false)}
				/>
			) : (
				<div>
					<h1>{recipe.name}</h1>
					<p>Вегетарианский: {recipe.isVegetarian ? 'Да' : 'Нет'}</p>
					<p>Веганский: {recipe.isVegan ? 'Да' : 'Нет'}</p>
					<h2>Ингредиенты:</h2>
					<ul>
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index}>
								{ingredient.name} - {ingredient.quantity} {ingredient.unit}
							</li>
						))}
					</ul>
					<div style={{ marginTop: '20px' }}>
						<button onClick={() => setIsEditing(true)}>Редактировать</button>
						<button onClick={handleDeleteRecipe} style={{ marginLeft: '10px' }}>
							Удалить
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default RecipeDetail
