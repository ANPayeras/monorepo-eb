"use client"

import {
    ColumnDef,
    Row,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Fragment, ReactNode } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    renderSubComponent?: (props: { row: Row<TData> }) => ReactNode
    getRowCanExpand?: (row: Row<TData>) => boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    getRowCanExpand,
    renderSubComponent,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        defaultColumn: {
            size: 100
        },
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowCanExpand: getRowCanExpand,
        getExpandedRowModel: getExpandedRowModel(),
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}
                                    style={{
                                        minWidth: header.column.columnDef.size,
                                        maxWidth: header.column.columnDef.size,
                                    }}
                                    className="text-slate-50"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <Fragment key={row.id}>
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="text-slate-50"
                                onClick={row.getToggleExpandedHandler}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}
                                        style={{
                                            minWidth: cell.column.columnDef.size,
                                            maxWidth: cell.column.columnDef.size,
                                            backdropFilter: 'brightness(0.8)'
                                        }}
                                        onClick={() => row.toggleExpanded()}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {
                                row.getIsExpanded() &&
                                renderSubComponent && renderSubComponent({ row })
                            }
                        </Fragment>
                    ))
                ) : (
                    <TableRow className="text-slate-50">
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            Agregue secciones para ver la informacion aqui.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
