import React from 'react'

const PlaceholdersWidgets = ({ type }: { type: string }) => {

    const texts: { [key: string]: string } = {
        link: 'Link vacío',
        text: 'Texto vacío',
        socials: 'Agregá una red social',
    }

    return (
        <div className='text-sm md:text-medium w-1/2 text-center rounded-sm mx-auto opacity-50'>
            {texts[type]}
        </div>
    )
}

export default PlaceholdersWidgets