// import '@unocss/reset/tailwind.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import LoginModal from './components/modals/login-modal'
import RegisterModal from './components/modals/register-modal'
import RentModal from './components/modals/rent-modal'
import Navbar from './components/navbar'
import './global.css'
import ToasterProvider from './providers/toaster-provider'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Arbnb',
	description: 'Generated by create next app',
}

const font = Nunito({
	subsets: ['latin']
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const currentUser = await getCurrentUser()

	return (
		<html lang="en">
			<body className={font.className} m="0">
				<ToasterProvider />
				<LoginModal />
				<RegisterModal />
				<RentModal />
				<Navbar currentUser={currentUser} />
				<div className='pb-20 pt-28'>
					{children}
				</div>
			</body>
		</html>
	)
}
