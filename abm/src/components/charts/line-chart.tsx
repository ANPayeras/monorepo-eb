"use client"

import { CartesianGrid, LabelList, Line, LineChart } from "recharts"

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


type LineChartComponent = {
    title: string;
    description: string;
    chartConfig: ChartConfig;
    chartData: any[];
}

export function LineChartComponent({ title, description, chartConfig, chartData }: LineChartComponent) {
    return (
        <>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 24,
                            left: 24,
                            right: 24,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    nameKey="visitors"
                                    hideLabel
                                />
                            }
                        />
                        <Line
                            dataKey="visitors"
                            type="natural"
                            stroke="var(--color-visitors)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-visitors)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                dataKey="browser"
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </>
    )
}
