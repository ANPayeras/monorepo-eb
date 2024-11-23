import React, { memo } from 'react'
import { Tab, Tabs } from '../ui/tabs'

const SelectPaymentMethod = ({ tab = 0, onSelectPM }: { tab: number, onSelectPM: (e: Tab) => void }) => {
    return (
        <div>
            <Tabs
                containerClassName='my-5 border-b pb-1 text-sm xs:text-medium'
                tabs={
                    [
                        {
                            title: "Transferencia",
                            value: '0',
                            reference: 'transference',
                        },
                        {
                            title: "Tarjeta",
                            value: '1',
                            reference: 'card',
                        },
                    ]}
                onClick={onSelectPM}
                moveTabIdx={tab}
            />
        </div>
    )
}

export default memo(SelectPaymentMethod)