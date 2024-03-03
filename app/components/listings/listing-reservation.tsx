'use client'

import { NextPage } from "next"
import { type Range } from 'react-date-range'
import Button from "../button"
import Calendar from "../inputs/calendar"

interface ListingReservationProps {
    price: number
    totalPrice: number
    onChangeDate: (value: Range) => void
    dateRange: Range
    onSubmit: () => void
    disabled: boolean
    disabledDates: Date[]
}

const ListingReservation: NextPage<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <div className="
            bg-white
            rounded-xl
            b-1
            b-solid
            b-neutral-2
            overflow-hidden
        ">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    $ {price}
                </div>
                <div className="font-light text-neutral-6">
                    night
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    disabled={disabled}
                    label="Reserve"
                    onClick={onSubmit} />
            </div>
            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            ">
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
    );
}
 
export default ListingReservation;