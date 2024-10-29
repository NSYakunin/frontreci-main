// components/SearchBar.tsx

import React from 'react'

interface SearchBarProps {
	searchTerm: string
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchTerm,
	onSearchChange,
}) => (
	<div>
		<h1>Поиск рецептов</h1>
		<input
			type='text'
			value={searchTerm}
			onChange={onSearchChange}
			placeholder='Введите название рецепта'
			style={{ width: '70%', padding: '10px', fontSize: '18px' }}
		/>
	</div>
)

export default SearchBar
