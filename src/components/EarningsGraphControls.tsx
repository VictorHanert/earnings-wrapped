import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EarningsGraphControlsProps {
  growthRate: number;
  setGrowthRate: (value: number) => void;
  savingsRate: number;
  setSavingsRate: (value: number) => void;
  contributionFrequency: string;
  setContributionFrequency: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const getGrowthRateProfile = (rate: number): string => {
  if (rate <= 4) return "Conservative investor (low-risk bonds and savings)";
  if (rate <= 7) return "Balanced investor (mix of stocks and bonds)";
  if (rate <= 9) return "Growth investor (stock market focus)";
  return "Aggressive investor (high-risk, high-reward strategy)";
};

const getSavingsRateProfile = (rate: number): string => {
  if (rate <= 10) return "Minimal saver (building basic savings)";
  if (rate <= 15) return "Moderate saver (steady wealth building)";
  if (rate <= 20) return "Dedicated saver (focused on financial goals)";
  return "Aggressive saver (maximizing wealth accumulation)";
};

const EarningsGraphControls = ({
  growthRate,
  setGrowthRate,
  savingsRate,
  setSavingsRate,
  contributionFrequency,
  setContributionFrequency,
  timeRange,
  setTimeRange,
}: EarningsGraphControlsProps) => {
  const timeRangeOptions = [
    { value: "5", label: "5 Years" },
    { value: "10", label: "10 Years" },
    { value: "15", label: "15 Years" },
    { value: "20", label: "20 Years" },
    { value: "25", label: "25 Years" },
    { value: "30", label: "30 Years" },
    { value: "40", label: "40 Years" },
    { value: "50", label: "50 Years" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="space-y-4">
        <Label>Growth Rate ({growthRate}%)</Label>
        <Slider
          value={[growthRate]}
          onValueChange={(value) => setGrowthRate(value[0])}
          min={0}
          max={12}
          step={0.5}
        />
        <p className="text-sm text-muted-foreground">{getGrowthRateProfile(growthRate)}</p>
      </div>
      <div className="space-y-4">
        <Label>Savings Rate ({savingsRate}%)</Label>
        <Slider
          value={[savingsRate]}
          onValueChange={(value) => setSavingsRate(value[0])}
          min={5}
          max={30}
          step={1}
        />
        <p className="text-sm text-muted-foreground">{getSavingsRateProfile(savingsRate)}</p>
      </div>
      <div className="space-y-4">
        <Label>Contribution Frequency</Label>
        <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4 md:col-span-3">
        <Label>Time Range</Label>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EarningsGraphControls;