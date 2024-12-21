import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Currency } from "@/utils/calculations";
import { Calendar, Clock, Percent, Wallet } from "lucide-react";

interface SalaryInputProps {
  hourlyRate?: string;
  monthlyIncome?: string;
  hoursPerMonth: string;
  taxPercentage: string;
  afterTaxAmount: string;
  useTaxPercentage: boolean;
  currency: Currency;
  showMonthlyInput: boolean;
  onHourlyRateChange?: (value: string) => void;
  onMonthlyIncomeChange?: (value: string) => void;
  onHoursChange: (value: string) => void;
  onTaxPercentageChange: (value: string) => void;
  onAfterTaxAmountChange: (value: string) => void;
  onUseTaxPercentageChange: (value: boolean) => void;
  onCurrencyChange: (value: Currency) => void;
}

const SalaryInput = ({
  hourlyRate,
  monthlyIncome,
  hoursPerMonth,
  taxPercentage,
  afterTaxAmount,
  useTaxPercentage,
  currency,
  showMonthlyInput,
  onHourlyRateChange,
  onMonthlyIncomeChange,
  onHoursChange,
  onTaxPercentageChange,
  onAfterTaxAmountChange,
  onUseTaxPercentageChange,
  onCurrencyChange,
}: SalaryInputProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          {showMonthlyInput ? (
            <>Monthly Income <Wallet className="inline-block w-4" /></>
          ) : (
            <>Hourly Rate <Clock className="inline-block w-4" /></>
          )}
        </Label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={showMonthlyInput ? monthlyIncome : hourlyRate}
            onChange={(e) => 
              showMonthlyInput 
                ? onMonthlyIncomeChange?.(e.target.value)
                : onHourlyRateChange?.(e.target.value)
            }
            placeholder={showMonthlyInput ? "Enter monthly income" : "Enter hourly rate"}
            className="flex-1"
            autoFocus
          />
          <Select value={currency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DKK">DKK 🇩🇰</SelectItem>
              <SelectItem value="USD">USD 🇺🇸</SelectItem>
              <SelectItem value="EUR">EUR 🇪🇺</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Hours per Month <Calendar className="inline-block w-4" /></Label>
        <Slider
          value={[Number(hoursPerMonth)]}
          onValueChange={(value) => onHoursChange(value[0].toString())}
          max={200}
          step={1}
          className="w-full"
        />
        <Input
          type="number"
          value={hoursPerMonth}
          onChange={(e) => onHoursChange(e.target.value)}
          placeholder="Enter hours per month"
          className="w-full mt-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700">
            {useTaxPercentage ? "Tax Percentage" : "After Tax Amount"} {" "}
            <Percent className="inline-block w-4" />
          </Label>
          <div className="flex items-center space-x-2">
            <Label className="text-sm text-gray-500">Use Tax Percentage</Label>
            <Switch
              checked={useTaxPercentage}
              onCheckedChange={onUseTaxPercentageChange}
            />
          </div>
        </div>
        {useTaxPercentage ? (
          <div className="space-y-4">
            <Slider
              value={[Number(taxPercentage)]}
              onValueChange={(value) => onTaxPercentageChange(value[0].toString())}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={taxPercentage}
                onChange={(e) => onTaxPercentageChange(e.target.value)}
                placeholder="Enter tax percentage"
                className="w-full"
                min="0"
                max="100"
              />
              <span className="text-gray-500">%</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={afterTaxAmount}
              onChange={(e) => onAfterTaxAmountChange(e.target.value)}
              placeholder="Enter after tax amount"
              className="w-full"
            />
            <span className="text-gray-500">{currency}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryInput;