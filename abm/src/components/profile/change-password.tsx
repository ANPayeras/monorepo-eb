"use client"
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ClerkAPIError } from '@clerk/types/dist/index'

export const formSchema = z.object({
    oldPassword: z.optional(z.string().min(8, {
        message: "La contraseña debe contener 8 o más caracteres.",
    })),
    newPassword: z.string().min(8, {
        message: "La contraseña debe contener 8 o más caracteres.",
    }),
    repeatNewPassword: z.string().min(8, {
        message: "La contraseña debe contener 8 o más caracteres.",
    }),
    check: z.union([z.string(), z.number(), z.array(z.string()), z.undefined()]),
}).refine(data => data.newPassword === data.repeatNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ['repeatNewPassword'],
});

const errors: { [key: string]: { type: "oldPassword" | "newPassword" | "repeatNewPassword" | "check" | "root" | `root.${string}`, msg: string } } = {
    current_password: {
        type: 'oldPassword',
        msg: 'Contraseña incorrecta',
    },
    new_password: {
        type: 'newPassword',
        msg: 'Contraseña poco segura, intente con otra',
    }
}

const ChangePassword = ({ setOpen, handleAccept, isPassword }: { setOpen: Dispatch<SetStateAction<boolean>>, handleAccept: (data: z.infer<typeof formSchema>) => Promise<boolean>, isPassword: boolean }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: '',
            repeatNewPassword: '',
            check: 'true',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await handleAccept(values)
            setOpen(false)
        } catch (error) {
            const _err = error as Error
            const err = JSON.parse(_err.message) as ClerkAPIError
            const errorFormatted = errors[err.meta?.paramName!]
            form.setError(errorFormatted.type, { message: errorFormatted.msg })
        }
    }

    const { newPassword, repeatNewPassword, oldPassword } = form.watch()

    useEffect(() => {
        if (newPassword !== repeatNewPassword) {
            form.setError('repeatNewPassword', { message: "Las contraseñas no coinciden" })
        } else {
            form.clearErrors('repeatNewPassword')
        }
    }, [form, newPassword, repeatNewPassword])

    useEffect(() => {
        if (isPassword) {
            form.reset({
                check: 'true',
                newPassword: '',
                oldPassword: '',
                repeatNewPassword: '',
            })
        }
    }, [form, isPassword])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {
                    isPassword && typeof oldPassword === 'string' &&
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña actual</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} autoComplete='' />
                                </FormControl>
                                {
                                    form.formState.errors[field.name] ?
                                        <FormMessage className='ml-4 text-xs opacity-50' /> :
                                        <FormDescription className='ml-4 text-xs opacity-50'>
                                            Debe contener 8 o más caracteres.
                                        </FormDescription>
                                }
                            </FormItem>
                        )}
                    />
                }
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} autoComplete='' />
                            </FormControl>
                            {
                                form.formState.errors[field.name] ?
                                    <FormMessage className='ml-4 text-xs opacity-50' /> :
                                    <FormDescription className='ml-4 text-xs opacity-50'>
                                        Debe contener 8 o más caracteres.
                                    </FormDescription>
                            }
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repeatNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repita la nueva contraseña</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} autoComplete='' />
                            </FormControl>
                            {
                                form.formState.errors[field.name] ?
                                    <FormMessage className='ml-4 text-xs opacity-50' /> :
                                    <FormDescription className='ml-4 text-xs opacity-50'>
                                        Debe contener 8 o más caracteres.
                                    </FormDescription>
                            }
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="check"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-2'>
                            <FormControl>
                                <Input
                                    type='checkbox'
                                    defaultChecked
                                    onChange={(e) => form.setValue('check', String(e.target.checked))}
                                    className='w-4 h-4 accent-black cursor-pointer mt-2'
                                />
                            </FormControl>
                            <FormDescription className='text-sm'>
                                Cerrar sesión en otros dispositivos en los que haya iniciado sesión
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <div className='flex justify-end gap-2'>
                    <Button className='text-black bg-transparent hover:bg-slate-300' type='button' onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        type="submit"
                        disabled={!form.formState.isValid}
                    >
                        Aceptar
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ChangePassword