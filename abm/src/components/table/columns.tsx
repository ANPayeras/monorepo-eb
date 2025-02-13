"use client"

import { Sections } from "@/stores/data-store"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Sections>[] = [
    {
        id: 'name',
        accessorKey: "label",
        header: "Descripcion",
        cell: ({ renderValue }) => {
            return (
                <span
                    style={{
                        width: '100%',
                        display: 'inline-block',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}
                >
                    {renderValue<string>() || 'Nombre categoria'}
                </span>
            )
        },
    },
    {
        id: 'expander',
        header: () => null,
        size: 10,
        cell: ({ row }) => {
            return (row.getCanExpand() ? (
                <span className="w-full flex justify-end">
                    <button
                        {...{
                            onClick: row.getToggleExpandedHandler(),
                            className: 'cursor-pointer hover:text-slate-500'
                        }}
                    >
                        {row.getIsExpanded() ? <IconChevronUp /> : <IconChevronDown />}
                    </button>
                </span>

            ) : (
                '🔵'
            ))
        },
    },
]