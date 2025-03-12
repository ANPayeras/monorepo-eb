"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
import EmptyChartInfo from "./empty-chart-info"

type BarChartCustomComponent = {
    title: string;
    description?: string;
    chartConfig: ChartConfig;
    chartData: any[];
    xDataKey: string;
    yDataKey: string;
}

export function BarChartCustom({ title, description, chartConfig, chartData, xDataKey, yDataKey }: BarChartCustomComponent) {
    return (
        <>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    {
                        !chartData.length ? <EmptyChartInfo /> :
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                layout="vertical"
                            >
                                <XAxis type="number" dataKey={xDataKey} hide />
                                <YAxis
                                    dataKey={yDataKey}
                                    type="category"
                                    tickLine={false}
                                    // tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey={xDataKey} fill={`var(--color-${xDataKey})`} radius={5} />
                            </BarChart>
                    }
                </ChartContainer>
            </CardContent>
        </>
    )
}
