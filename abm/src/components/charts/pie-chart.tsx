"use client"

import { LabelList, Pie, PieChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type PieChartComponent = {
    title: string;
    description?: string;
    chartConfig: ChartConfig;
    chartData: any[];
}

export function PieChartComponent({ title, description, chartConfig, chartData }: PieChartComponent) {
    return (
        <>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </div>
            </CardHeader >
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square h-[200px] w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="visitors" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="visitors">
                            <LabelList
                                dataKey="label"
                                className="fill-background hidden md:flex"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="label" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center md:hidden"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </>
    )
}
