import React from 'react'

const FooterBuild = ({ generatePreview, saveChanges }: { generatePreview: () => {}, saveChanges: () => {} }) => {
    return (
        <div className='flex justify-between items-center'>
            <button onClick={generatePreview} className="p-[3px] relative cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-4 py-1 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                    Generar vista previa
                </div>
            </button>
            <button onClick={saveChanges} className="p-[3px] relative cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-4 py-1 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                    Guardar
                </div>
            </button>
        </div>
    )
}

export default FooterBuild