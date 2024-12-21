import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateTimeBasedEarnings, formatCurrency, Currency } from "@/utils/calculations";

interface SalaryCardProps {
  title: string;
  hourlyRate: number;
  hoursPerMonth: number;
  currency: Currency;
}

const SalaryCard = ({ title, hourlyRate, hoursPerMonth, currency }: SalaryCardProps) => {
  const earnings = calculateTimeBasedEarnings(hourlyRate, hoursPerMonth, currency);

  return (
    <Card className="overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-gray-500 bg-white/80 backdrop-blur-sm border border-gray-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-center border-b border-gray-300 font-bold text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-gray-600">Overview</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Per Hour</p>
              <p className="font-mono">{formatCurrency(earnings.perHour, currency)}</p>
            </div>
            <div>
              <p className="text-gray-500">Per Day</p>
              <p className="font-mono">{formatCurrency(earnings.perDay, currency)}</p>
            </div>
            <div>
              <p className="text-gray-500">Per Week</p>
              <p className="font-mono">{formatCurrency(earnings.perWeek, currency)}</p>
            </div>
            <div>
              <p className="text-gray-500">Per Month</p>
              <p className="font-mono">{formatCurrency(earnings.perMonth, currency)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-gray-600">During Working Hours</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Per Working Second</p>
              <p className="font-mono">{formatCurrency(earnings.actualWorkingSecond, currency)}</p>
            </div>
            <div>
              <p className="text-gray-500">Per Working Minute</p>
              <p className="font-mono">{formatCurrency(earnings.actualWorkingMinute, currency)}</p>
            </div>
            <div>
              <p className="text-gray-500">Per Working Hour</p>
              <p className="font-mono">{formatCurrency(earnings.perHour, currency)}</p>
            </div>
            <div>
              <p className="text-gray-500">Working Hours/Day</p>
              <p className="font-mono">{earnings.workingHoursPerDay.toFixed(1)} hours</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-300">
          <div className="text-sm">
            <p className="text-gray-500">Yearly Income</p>
            <p className="font-mono font-bold text-lg">{formatCurrency(earnings.perYear, currency)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryCard;