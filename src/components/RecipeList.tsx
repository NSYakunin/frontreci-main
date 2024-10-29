// components/RecipeList.tsx

import React from 'react'
import { Recipe } from '../types/types'
import Link from 'next/link'

interface RecipeListProps {
	recipes: Recipe[]
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => (
	<div>
		<h1>Список рецептов</h1>
		{recipes.length > 0 ? (
			<ul style={{ listStyleType: 'none', padding: 0 }}>
				{recipes.map(recipe => (
					<li
						key={recipe.recipeID}
						style={{
							marginBottom: '20px',
							borderBottom: '1px solid #ccc',
							paddingBottom: '10px',
						}}
					>
						<h2>
							<Link href={`/recipes/${recipe.recipeID}`}>{recipe.name}</Link>
						</h2>
						<p>Вегетарианский: {recipe.isVegetarian ? 'Да' : 'Нет'}</p>
						<p>Веганский: {recipe.isVegan ? 'Да' : 'Нет'}</p>
					</li>
				))}
			</ul>
		) : (
			<p>Рецепты не найдены.</p>
		)}
	</div>
)

export default RecipeList
