"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { TrendingUp, DollarSign, Users, ShoppingCart } from "lucide-react"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const pieChartData = [
    { browser: "chrome", visitors: 275, fill: "hsl(var(--chart-1))" },
    { browser: "safari", visitors: 200, fill: "hsl(var(--chart-2))" },
    { browser: "firefox", visitors: 187, fill: "hsl(var(--chart-3))" },
    { browser: "edge", visitors: 173, fill: "hsl(var(--chart-4))" },
    { browser: "other", visitors: 90, fill: "hsl(var(--chart-5))" },
]


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export default function AnalyticsDashboard() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-4xl font-bold font-headline">$45,231.89</div>
            <p className="text-xs text-muted-foreground font-body">+20.1% from last month</p>
            </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">New Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-4xl font-bold font-headline">+235</div>
            <p className="text-xs text-muted-foreground font-body">+180.1% from last month</p>
            </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">Bookings</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-4xl font-bold font-headline">+12,234</div>
            <p className="text-xs text-muted-foreground font-body">+19% from last month</p>
            </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-4xl font-bold font-headline">12.5%</div>
            <p className="text-xs text-muted-foreground font-body">+2.1% from last month</p>
            </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl">
            <CardHeader>
            <CardTitle className="font-headline text-2xl">Bookings Overview</CardTitle>
            <CardDescription className="font-body">January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent
                    indicator="line"
                    />}
                />
                <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="mobile"
                    type="natural"
                    stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                    />
                </LineChart>
            </ChartContainer>
            </CardContent>
            <CardFooter>
                 <ChartLegend content={<ChartLegendContent />} />
            </CardFooter>
        </Card>
        
        <Card className="md:col-span-2 bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle className="font-headline text-2xl">Traffic by Device</CardTitle>
                <CardDescription className="font-body">January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square h-full"
                >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                    data={pieChartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                    />
                     <ChartLegend
                        content={<ChartLegendContent nameKey="browser" />}
                        className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                    />
                </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  )
}
