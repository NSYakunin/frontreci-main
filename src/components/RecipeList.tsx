import React from 'react'
import { Recipe } from '../types/types'
import Link from 'next/link'

interface RecipeListProps {
	recipes: Recipe[]
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => (
	<div>
		<h1 className='text-3xl font-bold mb-6 text-green-600 animate-fadeIn'>
			Список рецептов
		</h1>
		{recipes.length > 0 ? (
			<ul className='space-y-6'>
				{recipes.map(recipe => (
					<li
						key={recipe.recipeID}
						className='p-6 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300'
					>
						<h2 className='text-2xl font-semibold text-gray-800 mb-2'>
							<Link href={`/recipes/${recipe.recipeID}`}>{recipe.name}</Link>
						</h2>
						<p className='text-gray-600'>
							Вегетарианский: {recipe.isVegetarian ? 'Да' : 'Нет'}
						</p>
						<p className='text-gray-600'>
							Веганский: {recipe.isVegan ? 'Да' : 'Нет'}
						</p>
					</li>
				))}
			</ul>
		) : (
			<p className='text-gray-600'>Рецепты не найдены.</p>
		)}
	</div>
)

export default RecipeList
