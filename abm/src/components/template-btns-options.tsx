import React, { ChangeEvent, useEffect, useState } from 'react'

import { Variants, motion } from "framer-motion";
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Switch } from './ui/switch';
import { useIsSmall } from '@/hooks/use-media.query';
import { revalidatePathAction } from '@/actions/actions';
import { useDataStore } from '@/providers/data-store-providers';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { TemplateBtnsOptionsProps } from '@/interfaces';

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const TemplateBtnsOptions = ({ t, i, isHovered, templateHovered, onActiveTemplate, isPremium, activesTemplates }: TemplateBtnsOptionsProps) => {
    const { toast } = useToast()
    const { resetState } = useDataStore(state => state)
    const deleteTemplate = useMutation(api.templates.deleteTemplate)
    const updateTemplate = useMutation(api.templates.updateTemplate)
    const changeLastBuild = useMutation(api.templates.changeLastBuild)
    const isSmall = useIsSmall()
    const router = useRouter()
    const [isDeleteTemplate, setIsDeleteTemplate] = useState<boolean>(false);
    const [isNameEdited, setIsNameEdited] = useState<boolean>(false);
    const [name, setName] = useState<string>(t?.name?.split('@')[1] || '');

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

    useEffect(() => {
        if (!isSmall && !isHovered) {
            setIsNameEdited(false)
            setIsDeleteTemplate(false)
        }
    }, [isHovered, isSmall])

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const changeName = async () => {
        const templateName = `${t.name?.split('@')[0]}${name ? `@${name}` : ''}`
        const existName = activesTemplates?.find(t => t.name === templateName)
        if (existName && t.active) {
            toast({
                title: "No pueden existir dos plantillas activas con el mismo nombre",
                variant: 'destructive',
                duration: 5000,
            })
            return
        }

        try {
            await updateTemplate({ ...t, name: `${templateName}` })
            setIsNameEdited(false)
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
            className={cn("justify-around items-center w-full opacity-0 hidden bg-slate-400 absolute top-0 left-0 overflow-hidden z-50", !isPremium ? 'rounded-t-sm' : '')}
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
                    !isDeleteTemplate && !isNameEdited &&
                    <>
                        <motion.div className='flex gap-2'>
                            <motion.button
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={editTemplate}
                                className='px-2 py-1 bg-black text-white rounded-tl-sm font-bold text-sm sm:text-medium flex justify-center items-center'
                            >
                                <Icon name='edit' iconProps={{ size: 18 }} />
                            </motion.button>
                            <motion.button
                                className='flex px-2 py-1 bg-black text-white font-bold text-sm sm:text-medium justify-center items-center'
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => handleDeleteTemplate()}>
                                <Icon name='trash' iconProps={{ size: 18 }} />
                            </motion.button>
                        </motion.div>
                        {
                            isPremium &&
                            <motion.button
                                className='flex px-5 py-1 bg-black text-white font-bold text-sm sm:text-medium justify-center items-center'
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => setIsNameEdited(true)}>
                                Cambiar nombre
                            </motion.button>
                        }
                        <motion.div
                            className='px-1 py-1 bg-black text-white font-bold flex items-center gap-2 sm:gap-4 rounded-tr-sm'
                            variants={itemVariants}
                        >
                            <Switch
                                className='data-[state=checked]:bg-green-400 scale-90 sm:scale-100'
                                name='enabled'
                                onCheckedChange={(isActive) => onActiveTemplate(t, isActive)}
                                checked={t.active}
                            />
                        </motion.div>
                    </>
                }
                {
                    isDeleteTemplate && (templateHovered === i || isSmall) &&
                    <>
                        <motion.span variants={itemVariants} className='flex pl-1 items-center text-center text-sm sm:text-medium'>
                            ¿Desea borrar la plantilla?
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
                {
                    isNameEdited && (templateHovered === i || isSmall) &&
                    <motion.div className='flex flex-col gap-1 w-full'>
                        <motion.div className='flex justify-between'>
                            <motion.span variants={itemVariants} className='flex pl-1 items-center text-center text-sm sm:text-medium'>
                                Cambiar nombre:
                            </motion.span>
                            <motion.div className='flex gap-2'>
                                <motion.button
                                    className='px-2 py-1 bg-black text-white font-bold text-sm sm:text-medium'
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.1
                                    }}
                                    onClick={() => setIsNameEdited(false)}>
                                    Cancelar
                                </motion.button>
                                <motion.button
                                    className='px-2 py-1 bg-black disabled:bg-slate-600 text-white font-bold text-sm sm:text-medium'
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.1
                                    }}
                                    onClick={changeName}
                                    disabled={name === t?.name?.split('@')[1]}
                                >
                                    Aceptar
                                </motion.button>
                            </motion.div>
                        </motion.div>
                        <motion.div className='flex items-center px-1 pb-1'>
                            <motion.span>
                                {t.name?.split('@')[0]}@
                            </motion.span>
                            <Input
                                className='h-6 pl-0'
                                maxLength={10}
                                onChange={onChangeName}
                                value={name}
                            />
                        </motion.div>
                    </motion.div>
                }
            </motion.div>
        </motion.div>
    )
}

export default TemplateBtnsOptions