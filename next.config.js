// import UnoCSS from '@unocss/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config) => {
        config.cache = false
		// config.plugins.push(UnoCSS())
		return config
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'avatars.githubusercontent.com',
			port: '',
			// pathname: '/**',
		  },
		  {
			protocol: 'https',
			hostname: 'lh3.googleusercontent.com',
			port: ''
		  },
		  {
			protocol: 'https',
			hostname: 'res.cloudinary.com',
			port: ''
		  }
		],
	  },
}

export default nextConfig
