import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency, Currency } from "@/utils/calculations";
import EarningsGraphControls from "./EarningsGraphControls";
import EarningsGraphExplanation from "./EarningsGraphExplanation";

interface EarningsGraphProps {
  monthlyEarnings: number;
  currency: Currency;
}

const EarningsGraph = ({ monthlyEarnings, currency }: EarningsGraphProps) => {
  const [timeRange, setTimeRange] = useState("10"); // Default to 10 years
  const [growthRate, setGrowthRate] = useState(5);
  const [savingsRate, setSavingsRate] = useState(10);
  const [contributionFrequency, setContributionFrequency] = useState("monthly");

  const formatLargeNumber = (value: number) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return Math.round(value / 1000) + 'K';
    }
    return value.toFixed(0);
  };

  const formatAxisValue = (value: number) => {
    const currencySymbol = {
      USD: '$',
      EUR: '€',
      DKK: 'kr',
    }[currency];
    return `${formatLargeNumber(value)} ${currencySymbol}`;
  };

  const generateData = (years: number) => {
    const data = [];
    const monthsTotal = years * 12;
    const monthlyGrowthRate = growthRate / 12 / 100;
    const monthlySavings = (monthlyEarnings * savingsRate) / 100;
    
    let flatAmount = 0;
    let exponentialAmount = 0;
    let optimizedAmount = 0;
    
    for (let i = 0; i <= monthsTotal; i++) {
      flatAmount = monthlyEarnings * i;
      exponentialAmount = monthlyEarnings * i * (1 + monthlyGrowthRate) ** i;
      
      if (contributionFrequency === "weekly") {
        const weeklyContribution = monthlySavings / 4;
        optimizedAmount = (monthlyEarnings * i + weeklyContribution * (i * 4)) * (1 + monthlyGrowthRate) ** i;
      } else if (contributionFrequency === "monthly") {
        optimizedAmount = (monthlyEarnings + monthlySavings) * i * (1 + monthlyGrowthRate) ** i;
      } else {
        const yearlyContribution = monthlySavings * 12;
        optimizedAmount = (monthlyEarnings * i + yearlyContribution * Math.floor(i / 12)) * (1 + monthlyGrowthRate) ** i;
      }
      
      if (i % 12 === 0) {
        data.push({
          year: i / 12,
          flat: flatAmount,
          exponential: exponentialAmount,
          optimized: optimizedAmount,
        });
      }
    }
    return data;
  };

  const data = generateData(Number(timeRange));
  const finalValues = data[data.length - 1];

  const formatXAxis = (value: number) => {
    return `Year ${value}`;
  };

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value, currency);
  };

  const getGraphColors = () => {
    const baseColor = {
      USD: "#22c55e",
      EUR: "#3b82f6",
      DKK: "#8b5cf6",
    }[currency];

    return {
      flat: baseColor,
      exponential: "#f59e0b",
      optimized: "#ec4899",
    };
  };

  const colors = getGraphColors();

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Earnings Projection</CardTitle>
          <EarningsGraphExplanation />
        </CardHeader>
        <CardContent>
          <EarningsGraphControls
            growthRate={growthRate}
            setGrowthRate={setGrowthRate}
            savingsRate={savingsRate}
            setSavingsRate={setSavingsRate}
            contributionFrequency={contributionFrequency}
            setContributionFrequency={setContributionFrequency}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  tickFormatter={formatXAxis}
                />
                <YAxis
                  tickFormatter={formatAxisValue}
                  width={100}
                />
                <Tooltip
                  formatter={formatTooltipValue}
                  labelFormatter={formatXAxis}
                />
                <Legend />
                <Area
                  name="Flat Growth"
                  type="monotone"
                  dataKey="flat"
                  stroke={colors.flat}
                  fill="transparent"
                />
                <Area
                  name="Exponential Growth"
                  type="monotone"
                  dataKey="exponential"
                  stroke={colors.exponential}
                  fill="transparent"
                />
                <Area
                  name="Optimized Growth"
                  type="monotone"
                  dataKey="optimized"
                  stroke={colors.optimized}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Projected Earnings after {timeRange} years:</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="font-medium">Flat Growth:</span> {formatCurrency(finalValues.flat, currency)}</li>
              <li><span className="font-medium">Exponential Growth:</span> {formatCurrency(finalValues.exponential, currency)}</li>
              <li><span className="font-medium">Optimized Growth:</span> {formatCurrency(finalValues.optimized, currency)}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EarningsGraph;