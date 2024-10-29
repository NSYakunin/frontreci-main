// components/AddRecipeForm.tsx

import React, { useState, useEffect } from 'react';
import { NewRecipe, Ingredient, Recipe } from '../types/types';

interface AddRecipeFormProps {
  onSave: (recipe: NewRecipe) => void;
  onCancel: () => void;
  initialRecipe?: Recipe;
}

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({
	onSave,
	onCancel,
	initialRecipe,
}) => {
	const [newRecipe, setNewRecipe] = useState<NewRecipe>({
		name: '',
		isVegetarian: false,
		isVegan: false,
		ingredients: [],
	})

	useEffect(() => {
		if (initialRecipe) {
			setNewRecipe({
				name: initialRecipe.name,
				isVegetarian: initialRecipe.isVegetarian,
				isVegan: initialRecipe.isVegan,
				ingredients: initialRecipe.ingredients,
			})
		}
	}, [initialRecipe])

	interface AddRecipeFormProps {
		onSave: (newRecipe: NewRecipe) => void
		onCancel: () => void
	}

	// Обработчик добавления ингредиента
	const handleAddIngredient = () => {
		setNewRecipe(prevState => ({
			...prevState,
			ingredients: [
				...prevState.ingredients,
				{ name: '', unit: '', quantity: '' },
			],
		}))
	}

	// Обработчик изменения ингредиента
	const handleIngredientChange = (
		index: number,
		field: keyof Ingredient,
		value: string | number | ''
	) => {
		const updatedIngredients = newRecipe.ingredients.map((ingredient, i) =>
			i === index ? { ...ingredient, [field]: value } : ingredient
		)
		setNewRecipe(prevState => ({
			...prevState,
			ingredients: updatedIngredients,
		}))
	}

	// Обработчик удаления ингредиента
	const handleRemoveIngredient = (index: number) => {
		const updatedIngredients = newRecipe.ingredients.filter(
			(_, i) => i !== index
		)
		setNewRecipe(prevState => ({
			...prevState,
			ingredients: updatedIngredients,
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave(newRecipe)
	}

	return (
		<div className='mt-8 p-6 border border-gray-200 rounded-lg bg-white shadow-md animate-fadeIn'>
			<h2 className='text-2xl font-bold mb-4 text-purple-600'>
				Добавить новый рецепт
			</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={newRecipe.name}
					onChange={e => setNewRecipe({ ...newRecipe, name: e.target.value })}
					placeholder='Название рецепта'
					className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300'
					required
				/>
				<div className='flex items-center mb-4'>
					<label className='mr-6 flex items-center'>
						<input
							type='checkbox'
							checked={newRecipe.isVegetarian}
							onChange={e =>
								setNewRecipe({
									...newRecipe,
									isVegetarian: e.target.checked,
								})
							}
							className='mr-2'
						/>
						Вегетарианский
					</label>
					<label className='flex items-center'>
						<input
							type='checkbox'
							checked={newRecipe.isVegan}
							onChange={e =>
								setNewRecipe({ ...newRecipe, isVegan: e.target.checked })
							}
							className='mr-2'
						/>
						Веганский
					</label>
				</div>
				<h3 className='text-xl font-semibold mb-4'>Ингредиенты</h3>
				{newRecipe.ingredients.map((ingredient, index) => (
					<div
						key={index}
						className='mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50'
					>
						<div className='flex justify-between items-center mb-4'>
							<h4 className='text-lg font-semibold'>Ингредиент {index + 1}</h4>
							<button
								type='button'
								onClick={() => handleRemoveIngredient(index)}
								className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300'
							>
								Удалить
							</button>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<input
								type='text'
								placeholder='Название'
								value={ingredient.name}
								onChange={e =>
									handleIngredientChange(index, 'name', e.target.value)
								}
								className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300'
								required
							/>
							<input
								type='text'
								placeholder='Единица измерения'
								value={ingredient.unit}
								onChange={e =>
									handleIngredientChange(index, 'unit', e.target.value)
								}
								className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300'
								required
							/>
							<input
								type='number'
								placeholder='Количество'
								value={ingredient.quantity}
								onChange={e =>
									handleIngredientChange(
										index,
										'quantity',
										e.target.value === '' ? '' : Number(e.target.value)
									)
								}
								className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300'
								required
							/>
						</div>
					</div>
				))}
				<button
					type='button'
					onClick={handleAddIngredient}
					className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 mb-4'
				>
					Добавить ингредиент
				</button>
				<div className='flex space-x-4'>
					<button
						type='submit'
						className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300'
					>
						Сохранить
					</button>
					<button
						type='button'
						onClick={onCancel}
						className='px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300'
					>
						Отмена
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddRecipeForm
