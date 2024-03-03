'use client'

import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState } from "react";
import Heading from "../heading";
import Modal from "./modal";

import categories from '@/app/resource/categories';
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import CategoryInput from "../inputs/category-input";
import Counter from "../inputs/counter";
import CountrySelect from "../inputs/country-select";
import ImageUpload from "../inputs/image-upload";
import Input from "../inputs/input";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }

    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const router = useRouter()
    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        try {
            await axios.post('/api/listings', data)
            toast.success('Listing created!')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        } catch(e) {
            toast.error((e as Error).message ?? e)
        } finally {
            setIsLoading(false)
        }
    }

    const actionLabel = useMemo(() => step === STEPS.PRICE
        ? 'Create'
        : 'Next',
        [step]
    )
    const secondaryActionLabel = useMemo(() => step === STEPS.CATEGORY
        ? void 0
        : 'Back',
        [step]
    )

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title='Which of these best describes your place?'
                subtitle='Pick a category' />
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-50vh
                overflow-y-auto
            ">
                {categories.map(item => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            iconColor={item.iconColor} />
                    </div>
                ))}
            </div>
        </div>
    )

    const Map = useMemo(() => dynamic(() => import('../map'), {
        ssr: false
    }), [location])
    
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Where is your place located?'
                    subtitle="Help guests find you!" />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)} />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?" />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)} />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you allow?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)} />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you allow?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)} />
                
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!" />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!" />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?" />
                <Input
                    id="price"
                    label='Price'
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home"
            body={bodyContent} />
    );
}
 
export default RentModal;