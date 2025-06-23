import React, { useState } from 'react'

import { Variants, motion } from "framer-motion";
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Doc, Id } from '../../convex/_generated/dataModel';
import { Switch } from './ui/switch';
import { useIsSmall } from '@/hooks/use-media.query';
import { revalidatePathAction } from '@/actions/actions';
import { useDataStore } from '@/providers/data-store-providers';
import { useRouter } from 'next/navigation';

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const TemplateBtnsOptions = ({ t, i, isHovered, templateHovered }: { t: Doc<"templates">, i: number, isHovered: boolean, templateHovered: number | null }) => {
    const { resetState } = useDataStore(state => state)
    const deleteTemplate = useMutation(api.templates.deleteTemplate)
    const activeTemplate = useMutation(api.templates.activeTemplate)
    const changeLastBuild = useMutation(api.templates.changeLastBuild)
    const isSmall = useIsSmall()
    const router = useRouter()
    const [isDeleteTemplate, setIsDeleteTemplate] = useState<boolean>(false);

    const handleDeleteTemplate = () => {
        setIsDeleteTemplate(true)
    }

    const onDeleteTemplate = async (id: Id<"templates">) => {
        setIsDeleteTemplate(false)
        await deleteTemplate({ templateId: id })
        await revalidatePathAction(`/build/${id}`)
        resetState()
    }

    const editTemplate = async () => {
        try {
            await changeLastBuild({ _id: t._id })
            router.push(`/build/${t._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <motion.div
            initial={false}
            animate={(isHovered && templateHovered === i) || isSmall ? "open" : "closed"}
            variants={{
                open: {
                    opacity: 1,
                    display: 'flex',
                }
            }}
            className="justify-around items-center w-full opacity-0 hidden bg-slate-400 absolute top-0 left-0 rounded-t-sm overflow-hidden"
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
                className='flex justify-between w-full'
            >
                {
                    !isDeleteTemplate &&
                    <>
                        <motion.button
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.1
                            }}
                            onClick={editTemplate}
                            className='px-5 py-1 bg-black text-white rounded-tl-sm font-bold text-sm sm:text-medium flex justify-center items-center'
                        >
                            Editar
                        </motion.button>
                        <motion.button
                            className='flex px-5 py-1 bg-black text-white font-bold text-sm sm:text-medium justify-center items-center'
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.1
                            }}
                            onClick={() => handleDeleteTemplate()}>
                            Eliminar
                        </motion.button>
                        <motion.div
                            className='px-1 py-1 bg-black text-white font-bold flex items-center gap-2 sm:gap-4 rounded-tr-sm'
                            variants={itemVariants}
                        >
                            <Switch
                                className='data-[state=checked]:bg-green-400 scale-90 sm:scale-100'
                                name='enabled'
                                onClick={() => activeTemplate({ templateId: t._id })}
                                checked={t.active}
                            />
                        </motion.div>
                    </>
                }
                {
                    isDeleteTemplate && (templateHovered === i || isSmall) &&
                    <>
                        <motion.span variants={itemVariants} className='flex pl-1 items-center text-center text-sm sm:text-medium'>
                            Desea borrar la plantilla?
                        </motion.span>
                        <motion.div className='flex gap-2'>
                            <motion.button
                                className='px-5 py-1 bg-black text-white font-bold text-sm sm:text-medium'
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => setIsDeleteTemplate(false)}>
                                No
                            </motion.button>
                            <motion.button
                                className='px-5 py-1 bg-black text-white font-bold text-sm sm:text-medium'
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => onDeleteTemplate(t._id)}>
                                Si
                            </motion.button>
                        </motion.div>
                    </>
                }
            </motion.div>
        </motion.div>
    )
}

export default TemplateBtnsOptions