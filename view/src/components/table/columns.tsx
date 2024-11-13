"use client"
import { Sections } from "@/types"
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
                        overflow: 'hidden',
                    }}
                >
                    {renderValue<string>() || 'Nombre categoria'}
                </span>
            )
        },
    },
    {
        accessorKey: "price",
        header: "Precio",
        size: 10,
    },
    {
        id: 'expander',
        header: () => null,
        size: 10,
        cell: ({ row }) => {
            return (row.getCanExpand() ? (
                <span className="w-full flex justify-end">
                    <button>
                        {row.getIsExpanded() ? <IconChevronUp /> : <IconChevronDown />}
                    </button>
                </span>

            ) : (
                '🔵'
            ))
        },
    },
]