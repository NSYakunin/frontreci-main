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

	const handleUpdateRecipe = async (updatedRecipe: NewRecipe) => {
		if (id) {
			try {
				await updateRecipe(Number(id), updatedRecipe)
				setRecipe({ ...updatedRecipe, recipeID: Number(id) })
				setIsEditing(false)
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (error.response && error.response.status === 409) {
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
		return <p className='text-center text-gray-600'>Загрузка...</p>
	}

	return (
		<div className='p-6 max-w-4xl mx-auto animate-fadeIn'>
			<button
				onClick={() => router.push('/')}
				className='mb-6 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300'
			>
				Назад к списку рецептов
			</button>

			{isEditing ? (
				<AddRecipeForm
					initialRecipe={recipe}
					onSave={handleUpdateRecipe}
					onCancel={() => setIsEditing(false)}
				/>
			) : (
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<h1 className='text-3xl font-bold text-blue-600 mb-4'>
						{recipe.name}
					</h1>
					<p className='text-lg text-gray-700 mb-2'>
						Вегетарианский:{' '}
						<span className='font-semibold'>
							{recipe.isVegetarian ? 'Да' : 'Нет'}
						</span>
					</p>
					<p className='text-lg text-gray-700 mb-4'>
						Веганский:{' '}
						<span className='font-semibold'>
							{recipe.isVegan ? 'Да' : 'Нет'}
						</span>
					</p>
					<h2 className='text-2xl font-semibold text-green-600 mb-3'>
						Ингредиенты:
					</h2>
					<ul className='list-disc list-inside space-y-2'>
						{recipe.ingredients.map((ingredient, index) => (
							<li
								key={index}
								className='text-gray-700 hover:text-gray-900 transition duration-200'
							>
								<span className='font-semibold'>{ingredient.name}</span> -{' '}
								{ingredient.quantity} {ingredient.unit}
							</li>
						))}
					</ul>
					<div className='flex space-x-4 mt-6'>
						<button
							onClick={() => setIsEditing(true)}
							className='px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300'
						>
							Редактировать
						</button>
						<button
							onClick={handleDeleteRecipe}
							className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300'
						>
							Удалить
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default RecipeDetail
