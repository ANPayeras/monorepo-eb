import React from 'react'

const About = () => {
    return (
        <div className="h-[60vh] md:h-[70vh] py-4 px-2 bg-gradient-to-b from-slate-600 to-slate-600 box-content">
            <div className='h-full flex flex-col justify-center items-center gap-5 text-center'>
                <h2 className="text-xl md:text-5xl font-bold bg-gradient-to-br from-slate-200 to-slate-500 bg-clip-text text-transparent pb-5">
                    Sobre Nosotros
                </h2>
                <h3 className='text-medium md:text-xl bg-gradient-to-bl from-slate-200 to-slate-300 bg-clip-text text-transparent hover:bg-gradient-to-br transition-all'>
                    En estoy.link, creemos en el poder de compartir de forma simple, directa y efectiva.
                </h3>
                <h3 className='text-medium md:text-xl bg-gradient-to-tr from-slate-200 to-slate-300 bg-clip-text text-transparent hover:bg-gradient-to-l transition-all'>
                    Ya sea que crees contenido, emprendas o simplemente quieras compartir tus ideas, hacelo de una manera fácil y sencilla.
                </h3>
                <h4 className='text-medium md:text-xl mt-5 bg-gradient-to-bl from-slate-100 to-slate-200 bg-clip-text text-transparent hover:bg-gradient-to-br transition-all'>Contá tu historia...</h4>
            </div>
        </div>
    )
}

export default About