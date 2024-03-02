'use client'

import { NextPage } from 'next'
import { CldUploadWidget, getCldImageUrl } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'

declare global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (value: string) => void
    value: string
}

const ImageUpload: NextPage<ImageUploadProps> = ({value, onChange}) => {
    const handleUpload = useCallback((result: any) => {
        // const url = getCldImageUrl({
        //     src: result.info.publicId || result.info.id
        // })
        // console.log('=====result:', url, result.info.publicId, result.info.id);
        // onChange(url)

        const url = getCldImageUrl({
            src: result.info.public_id
        })
        
        onChange(url)
    }, [onChange])
    return (
        // onUploadAdded={handleUpload}
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset='airbnb-clone-web'
            options={{
                maxFiles: 1
            }}>
            {
                ({ open }) => {
                    return (
                        <div
                            onClick={() => open?.()}
                            className='
                                relative
                                pointer-cursor
                                hover:opacity-70
                                transition
                                b-dashed
                                b-2
                                p-20
                                b-neutral-3
                                flex
                                flex-col
                                justify-center
                                items-center
                                gap-4
                                text-neutral-6
                            '>
                            <i className='i-tabler:photo-plus text-12.5'></i>
                            <div className="font-semibold text-lg">
                                Click to upload
                            </div>
                            {value && (
                                <div className='absolute inset-0 w-full h-full'>
                                    <Image
                                        alt='Upload'
                                        fill
                                        style={{objectFit: 'cover'}}
                                        src={value} />
                                </div>
                            )}
                        </div>
                    )
                }
            }
        </CldUploadWidget>
    );
}
 
export default ImageUpload;