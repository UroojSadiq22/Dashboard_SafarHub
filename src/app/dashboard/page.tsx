'use client';

import { BarChart, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardStats, mockBarData, mockLineData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart as RechartsLineChart } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-1))",
  },
  growth: {
    label: "Growth",
    color: "hsl(var(--chart-2))",
  },
};

export default function DashboardRedirectPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
      },
    },
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
      >
        {mockDashboardStats.map((stat, i) => (
          <motion.div key={i} custom={i} variants={cardVariants}>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
         <motion.div variants={chartVariants} initial="hidden" animate="visible">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BarChart className="h-5 w-5 text-accent"/>
                Monthly Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsBarChart data={mockBarData}>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="bookings" fill="var(--color-bookings)" radius={4} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
         <motion.div variants={chartVariants} initial="hidden" animate="visible">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <LineChart className="h-5 w-5 text-accent"/>
                Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsLineChart data={mockLineData}>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="growth" stroke="var(--color-growth)" strokeWidth={2} dot={false} />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
