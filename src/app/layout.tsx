'use client'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Link from 'next/link'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className='min-h-screen flex flex-col'>
				{/* Header */}
				<header className='bg-blue-600 text-white'>
					<nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
						<div className='text-2xl font-bold'>
							<Link href='/'>Рецепты</Link>
						</div>
						<div className='space-x-4'>
							<Link href='/' className='hover:text-gray-200'>
								Главная
							</Link>
							<Link
								href='https://www.google.com/'
								className='hover:text-gray-200'
							>
								Google
							</Link>
						</div>
					</nav>
				</header>

				{/* Main Content */}
				<main className='flex-grow'>{children}</main>

				{/* Footer (если нужен) */}
				<footer className='bg-gray-800 text-white py-4'>
					<div className='container mx-auto px-4 text-center'>
						© {new Date().getFullYear()} My recipes
					</div>
				</footer>
			</body>
		</html>
	)
}
