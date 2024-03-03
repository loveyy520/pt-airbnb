'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { NextPage } from 'next/types'
import CategoryBox from '../category-box'
import Container from '../container'

import categories from '@/app/resource/categories'

const Categories: NextPage = () => {
    const params = useSearchParams()
    const category = params.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    return <Container>
        <div
            className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {
                    categories.map(cate => (
                        <CategoryBox
                            key={cate.label}
                            label={cate.label}
                            selected={category === cate.label}
                            description={cate.description}
                            icon={cate.icon}
                            iconColor={cate.iconColor!} />
                    ))
                }
            </div>
    </Container>
}

export default Categories