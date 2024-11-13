import React, { useState } from 'react'
import { Variants, motion } from "framer-motion";
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Doc, Id } from '../../convex/_generated/dataModel';
import Link from 'next/link';
import { Switch } from './ui/switch';

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const TemplateBtnsOptions = ({ t, i }: { t: Doc<"templates">, i: number }) => {
    const deleteTemplate = useMutation(api.templates.deleteTemplate)
    const activeTemplate = useMutation(api.templates.activeTemplate)
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [templateHovered, setTemplateHovered] = useState<number | null>(null);
    const [isDeleteTemplate, setIsDeleteTemplate] = useState<boolean>(false);

    const handleHoverTemplates = (templatePos: number | null) => {
        if (typeof templatePos === 'number') setIsHovered(true)
        else {
            setIsHovered(false)
            setIsDeleteTemplate(false)
        }
        setTemplateHovered(templatePos)
    }

    const handleDeleteTemplate = () => {
        setIsDeleteTemplate(true)
    }

    const onDeleteTemplate = (id: Id<"templates">) => {
        setIsDeleteTemplate(false)
        deleteTemplate({ templateId: id })
    }

    return (
        <motion.div
            initial={false}
            animate={isHovered && templateHovered === i ? "open" : "closed"}
            onHoverStart={() => handleHoverTemplates(i)}
            onHoverEnd={() => handleHoverTemplates(null)}
            variants={{
                open: {
                    opacity: 0.95,
                    boxShadow: '10px 10px 5px 0px rgba(30,41,59,1)'
                }
            }}
            className="flex justify-around items-center w-full h-[95%] opacity-0 bg-slate-400 absolute top-0 left-0 rounded-sm z-50"
        >
            <motion.div
                variants={{
                    open: {
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
                className='flex flex-col gap-4'
            >
                {
                    !isDeleteTemplate &&
                    <>
                        {
                            <motion.div
                                className='px-2 py-1 bg-black text-white font-bold absolute top-0 right-0 flex items-center gap-4 rounded-tr-sm'
                                variants={itemVariants}
                            >
                                <span>{t.active ? 'Activa' : 'Inactiva'}</span>
                                <Switch
                                    className='data-[state=checked]:bg-green-400'
                                    name='enabled'
                                    onClick={() => activeTemplate({ templateId: t._id })}
                                    checked={t.active}
                                />
                            </motion.div>
                        }
                        <Link href={`/build/${t._id}`}>
                            <motion.button
                                className='px-5 py-1 bg-black text-white rounded-sm font-bold w-full'
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                            >
                                Editar
                            </motion.button>
                        </Link>
                        <motion.button
                            className='px-5 py-1 bg-black text-white rounded-sm font-bold'
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.1
                            }}
                            onClick={() => handleDeleteTemplate()}>
                            Eliminar
                        </motion.button>
                    </>
                }
                {
                    isDeleteTemplate && templateHovered === i &&
                    <motion.div
                        variants={itemVariants}
                        className='flex flex-col gap-4'
                    >
                        <motion.span variants={itemVariants} className='text-center'>
                            Desea borrar la plantilla?
                        </motion.span>
                        <div className='flex justify-around'>
                            <motion.button
                                className='px-5 py-1 bg-black text-white rounded-sm font-bold'
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => setIsDeleteTemplate(false)}>
                                No
                            </motion.button>
                            <motion.button
                                className='px-5 py-1 bg-black text-white rounded-sm font-bold'
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => onDeleteTemplate(t._id)}>
                                Si
                            </motion.button>
                        </div>

                    </motion.div>
                }
            </motion.div>
        </motion.div>
    )
}

export default TemplateBtnsOptions