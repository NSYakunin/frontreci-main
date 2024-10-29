// 'use client' должно быть в начале файла, если вы используете хуки
'use client'

import React, { useState, useEffect } from 'react'
import { Recipe, NewRecipe } from '../types/types'
import { fetchRecipes, createRecipe, searchRecipes } from '../services/recipeService'
import SearchBar from '../components/SearchBar'
import RecipeList from '../components/RecipeList'
import AddRecipeForm from '../components/AddRecipeForm'
import axios from 'axios'

export default function Home() {
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
	const [openAddRecipe, setOpenAddRecipe] = useState(false)
	// Загрузка рецептов при монтировании компонента
	useEffect(() => {
		const loadRecipes = async () => {
			try {
				const data = await fetchRecipes(1, 9)
				setRecipes(data.recipes)
				setFilteredRecipes(data.recipes.slice(0, 9))
			} catch (error) {
				console.error('Ошибка при загрузке рецептов:', error)
			}
		}

		loadRecipes()
	}, [])
	
	// Обработчик изменения поискового запроса
	const handleSearchChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value
		setSearchTerm(value)

		if (value.trim() === '') {
			const data = await fetchRecipes(1, 50)
			setRecipes(data.recipes)
			setFilteredRecipes(data.recipes.slice(0, 7))
		} else {
			const data = await searchRecipes(value, 1, 10)
			setFilteredRecipes(data.recipes)
		}
	}

	// Обработчики для добавления рецепта
	const handleOpenAddRecipe = () => {
		setOpenAddRecipe(true)
	}

	const handleCloseAddRecipe = () => {
		setOpenAddRecipe(false)
	}

	const handleSaveRecipe = async (newRecipe: NewRecipe) => {
		try {
			const savedRecipe = await createRecipe(newRecipe)
			setRecipes(prevRecipes => [...prevRecipes, savedRecipe])
			setFilteredRecipes(prevRecipes => [...prevRecipes, savedRecipe])
			setOpenAddRecipe(false)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response && error.response.status === 409) {
					// Обработка ошибки 409 Conflict
					alert(
						error.response.data.message ||
							'Рецепт с таким именем уже существует.'
					)
				} else {
					alert('Ошибка при создании рецепта.')
				}
			} else {
				console.error('Неизвестная ошибка:', error)
				alert('Произошла неизвестная ошибка.')
			}
		}
	}

	return (
		<div style={{ display: 'flex' }}>
			{/* Левая часть экрана */}
			<div style={{ flex: 1, padding: '20px' }}>
				<SearchBar
					searchTerm={searchTerm}
					onSearchChange={handleSearchChange}
				/>
				<button
					onClick={handleOpenAddRecipe}
					style={{ marginTop: '25px', padding: '10px', fontSize: '20px' }}
				>
					Новый рецепт
				</button>

				{/* Форма добавления рецепта */}
				{openAddRecipe && (
					<AddRecipeForm
						onSave={handleSaveRecipe}
						onCancel={handleCloseAddRecipe}
					/>
				)}
			</div>

			{/* Правая часть экрана */}
			<div style={{ flex: 1, padding: '20px' }}>
				<RecipeList recipes={filteredRecipes} />
			</div>
		</div>
	)
}
