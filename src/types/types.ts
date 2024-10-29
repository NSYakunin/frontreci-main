// types/types.ts

export interface Ingredient {
	name: string
	unit: string
	quantity: number | ''
}

export interface NewRecipe {
	name: string
	isVegetarian: boolean
	isVegan: boolean
	ingredients: Ingredient[]
}

export interface Recipe extends NewRecipe {
	recipeID: number
}
