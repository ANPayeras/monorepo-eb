"use client"

import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Doc } from '../../../convex/_generated/dataModel'
import { useParams, useRouter } from 'next/navigation'

const SelectTemplate = ({ templates }: { templates: Doc<"templates">[] }) => {
    const router = useRouter()
    const params = useParams()
    const [name, setName] = useState('')

    const onSelectTemplate = (id: string) => {
        router.replace(`/metrics/${id}`)
    }

    useEffect(() => {
        if (params.id) {
            const template = templates.find(t => t._id === params.id[0])!
            setName(template.name!)
        }
    }, [params.id, templates])

    return (
        <div>
            <Select value={name} onValueChange={onSelectTemplate}>
                <SelectTrigger className="w-[200px] max-h-8">
                    <SelectValue placeholder="Plantilla">
                        {name}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {
                        templates.map(t => (
                            <SelectItem
                                key={t._id}
                                value={t._id}
                            >
                                {t.name}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectTemplate