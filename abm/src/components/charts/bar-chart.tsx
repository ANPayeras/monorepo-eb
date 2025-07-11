"use client"

import React, { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent"
import EmptyChartInfo from "./empty-chart-info"

type BarChartComponent = {
    title: string;
    description: string;
    chartConfig: ChartConfig;
    chartData: any[];
    tabs?: string[];
    dataKey?: string;
    formatterType: string;
}

export function BarChartComponent({ title, description, chartConfig, chartData, tabs, formatterType, dataKey }: BarChartComponent) {

    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>(tabs ? tabs[0] : '')

    const total = useMemo(() => ({
        desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
        mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }), [chartData])

    const tickFormatters: { [key: string]: any } = {
        date: (value: any) => {
            const date = new Date(`${value}T00:00:00`)
            return date.toLocaleDateString("es-ES", {
                month: "short",
                day: "numeric",
            })
        },
        hour: (value: any) => {
            return `${value}hs`
        }
    }

    const tooltipLabelFormatters: { [key: string]: any } = {
        date: (value: any) => {
            const date = new Date(`${value}T00:00:00`)
            return date.toLocaleDateString("es-ES", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
        },
        hour: (_value: any, payload: Array<Payload<ValueType, NameType>>) => {
            return `${payload[0].payload.xData}hs`
        }
    }

    const _dataKey = tabs ? activeChart : dataKey!

    return (
        <>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </div>
                {
                    tabs &&
                    < div className="flex">
                        {tabs.map((key) => {
                            const chart = key as keyof typeof chartConfig
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-xs text-muted-foreground">
                                        {chartConfig[chart].label}
                                    </span>
                                    <span className="text-lg font-bold leading-none sm:text-3xl">
                                        {total[key as keyof typeof total].toLocaleString(['es-ES'])}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                }
            </CardHeader >
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    {!chartData.length ?
                        <EmptyChartInfo /> :
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="xData"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={20}
                                tickFormatter={tickFormatters[formatterType]}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        nameKey="views"
                                        labelFormatter={tooltipLabelFormatters[formatterType]}
                                    />
                                }
                            />
                            <Bar dataKey={_dataKey} fill={`var(--color-${_dataKey})`} />
                        </BarChart>
                    }
                </ChartContainer>
            </CardContent>
        </>
    )
}