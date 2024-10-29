// components/AddRecipeForm.tsx

import React, { useState, useEffect } from 'react';
import { NewRecipe, Ingredient, Recipe } from '../types/types';

interface AddRecipeFormProps {
  onSave: (recipe: NewRecipe) => void;
  onCancel: () => void;
  initialRecipe?: Recipe;
}

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ onSave, onCancel, initialRecipe }) => {
  const [newRecipe, setNewRecipe] = useState<NewRecipe>({
    name: '',
    isVegetarian: false,
    isVegan: false,
    ingredients: [],
  });

  useEffect(() => {
    if (initialRecipe) {
      setNewRecipe({
        name: initialRecipe.name,
        isVegetarian: initialRecipe.isVegetarian,
        isVegan: initialRecipe.isVegan,
        ingredients: initialRecipe.ingredients,
      });
    }
  }, [initialRecipe]);

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
		<div
			style={{
				marginTop: '20px',
				padding: '10px',
				border: '1px solid #ccc',
			}}
		>
			<h2>Добавить новый рецепт</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={newRecipe.name}
					onChange={e => setNewRecipe({ ...newRecipe, name: e.target.value })}
					placeholder='Название рецепта'
					style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
					required
				/>
				<div>
					<label>
						<input
							type='checkbox'
							checked={newRecipe.isVegetarian}
							onChange={e =>
								setNewRecipe({
									...newRecipe,
									isVegetarian: e.target.checked,
								})
							}
						/>
						Вегетарианский
					</label>
					<label style={{ marginLeft: '20px' }}>
						<input
							type='checkbox'
							checked={newRecipe.isVegan}
							onChange={e =>
								setNewRecipe({ ...newRecipe, isVegan: e.target.checked })
							}
						/>
						Веганский
					</label>
				</div>
				<h3>Ингредиенты</h3>
				{newRecipe.ingredients.map((ingredient, index) => (
					<div
						key={index}
						style={{
							marginBottom: '10px',
							border: '1px solid #eee',
							padding: '10px',
							position: 'relative',
						}}
					>
						<button
							type='button'
							onClick={() => handleRemoveIngredient(index)}
							style={{ position: 'absolute', top: '5px', right: '5px' }}
						>
							Удалить
						</button>
						<input
							type='text'
							placeholder='Название'
							value={ingredient.name}
							onChange={e =>
								handleIngredientChange(index, 'name', e.target.value)
							}
							style={{ width: '30%', padding: '5px', marginRight: '10px' }}
							required
						/>
						<input
							type='text'
							placeholder='Единица измерения'
							value={ingredient.unit}
							onChange={e =>
								handleIngredientChange(index, 'unit', e.target.value)
							}
							style={{ width: '30%', padding: '5px', marginRight: '10px' }}
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
							style={{ width: '30%', padding: '5px' }}
							required
						/>
					</div>
				))}
				<button type='button' onClick={handleAddIngredient}>
					Добавить ингредиент
				</button>
				<div style={{ marginTop: '10px' }}>
					<button type='submit'>Сохранить</button>
					<button
						type='button'
						onClick={onCancel}
						style={{ marginLeft: '10px' }}
					>
						Отмена
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddRecipeForm
