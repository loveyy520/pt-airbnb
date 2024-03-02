'use client'

import { NextPage } from "next"
import { ReactElement, useCallback, useEffect, useState } from "react"
import Button from "../button"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    onSubmit: () => void
    title: string
    body: ReactElement
    footer?: ReactElement
    actionLabel: string
    disabled?: boolean
    secondaryAction?: () => void
    secondaryActionLabel?: string
}

const Modal: NextPage<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen)
    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) return
        setShowModal(false)
        setTimeout(onClose, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) return
        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return
        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) return null
    
    return ( <>
        <div
            className="
                flex
                justify-center
                items-center
                fixed
                inset-0
                z-50
                bg-neutral-8/70
                outline-none
                focus:outline-none
            "
            overflow="x-hidden y-auto">
            <div
                className="relative my-6 mx-auto"
                w="full md:4/6 lg:3/6 xl:2/5"
                h="full lg:auto md:auto">
                {/* CONTENT */}
                <div
                    className={`
                        transition
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}>
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                        h="full lg:auto md: auto">
                        {/* HEADER */}
                        <header className="flex items-center p-6 rounded-t justify-center relative" b="b-1 solid neutral-1">
                            <button
                                onClick={handleClose}
                                className="p-1 b-0 transition absolute left-9 rounded-full"
                                bg="transparent hover:neutral-2/70">
                                <i className="i-material-symbols:close-rounded m-auto text-18px"></i>
                            </button>
                            <div className="text-lg font-semibold">
                                {title}
                            </div>
                        </header>
                        {/* BODY */}
                        <section className="relative p-6 flex-auto">
                            {body}
                        </section>
                        {/* FOOTER */}
                        <footer className="flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryActionLabel && (
                                    <Button
                                        label={secondaryActionLabel}
                                        disabled={disabled}
                                        outline
                                        onClick={handleSecondaryAction}
                                        />
                                )}
                                <Button
                                    label={actionLabel}
                                    disabled={disabled}
                                    onClick={handleSubmit}
                                    />
                            </div>
                            {footer}
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default Modal;