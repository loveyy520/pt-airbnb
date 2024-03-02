import useCountries from '@/app/hooks/useCountries'
import { NextPage } from 'next'
import Select from 'react-select'

export interface CountrySelectValue {
    flag: string
    label: string
    latlng: [number, number]
    region: string
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue
    onChange: (value: CountrySelectValue) => void
}


const CountrySelect: NextPage<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll, getByValue } = useCountries()
    return (
        <div>
            <Select
                defaultMenuIsOpen
                placeholder='Any where'
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: CountrySelectValue) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>{option.flag}</div>
                        <div>
                            {option.label},
                            <span className='text-neutral-5 ml-1'>
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 b-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })} />
        </div>
    );
}
 
export default CountrySelect;