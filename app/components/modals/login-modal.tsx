'use client'

import { signIn } from 'next-auth/react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useCallback, useState } from 'react';
import Heading from '../heading';
import Input from '../inputs/input';
import Modal from './modal';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Button from '../button';
const LoginModal = () => {
    const router = useRouter()
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
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        
        const resp = await signIn('credentials', {
            ...data,
            redirect: false
        })
        .finally(() => setIsLoading(false))

        if (resp?.ok) {
            toast.success('Log in')
            router.refresh()
            loginModal.onClose()
        }

        if (resp?.error) {
            toast.error(resp.error)
        }
    }

    const bodyContent = (<div className='flex flex-col gap-4'>
        <Heading
            title='Welcome back!'
            subtitle='Login to your account!' />
        <Input
            id='email'
            label='Email'
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
        loginModal.onClose()
        registerModal.onOpen()
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
                        First time use airbnb?
                    </div>
                    <div onClick={toggleModal} className="text-neutral-8 cursor-pointer hover:underline">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return ( <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent} />);
}
 
export default LoginModal;