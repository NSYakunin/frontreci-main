import React from 'react'

interface SearchBarProps {
	searchTerm: string
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchTerm,
	onSearchChange,
}) => (
	<div className='mb-6'>
		<h1 className='text-3xl font-bold mb-4 text-blue-600 animate-fadeIn'>
			Поиск рецептов
		</h1>
		<input
			type='text'
			value={searchTerm}
			onChange={onSearchChange}
			placeholder='Введите название рецепта'
			className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
		/>
	</div>
)

export default SearchBar
