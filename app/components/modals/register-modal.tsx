'use client'

import axios from 'axios';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useCallback, useState } from 'react';
import Heading from '../heading';
import Input from '../inputs/input';
import Modal from './modal';

import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Button from '../button';
const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)

        const resp = await axios.post('/api/register', data)
            .catch((e) => {
                toast.error('Something went wrong')
            })
            .finally(() => setIsLoading(false))
        console.log('resp:', resp)
        
        registerModal.onClose()
    }

    const bodyContent = (<div className='flex flex-col gap-4'>
        <Heading
            title='Welcome to Airbnb!'
            subtitle='Create an account' />
        <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required />
        <Input
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required />
        <Input
            id='password'
            label='Password'
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required />
    </div>)

    const toggleModal = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon="i-logos:google-icon"
                onClick={() => signIn('google')} />
            <Button
                outline
                label="Continue with Github"
                icon="i-logos:github-icon"
                onClick={() => signIn('github')} />
            <div className='mt-4 font-light' text='neutral-5 center'>
                <div className='flex justify-center flex-row items-center gap-3'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggleModal} className="text-neutral-8 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>
            </div>
        </div>
    )

    return ( <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent} />);
}

export default RegisterModal;