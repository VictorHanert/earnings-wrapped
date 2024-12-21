import React, { useState } from "react";
import SalaryInput from "@/components/SalaryInput";
import SalaryCard from "@/components/SalaryCard";
import EarningsGraph from "@/components/EarningsGraph";
import { Currency, calculateAfterTax } from "@/utils/calculations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [hoursPerMonth, setHoursPerMonth] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [afterTaxAmount, setAfterTaxAmount] = useState("");
  const [useTaxPercentage, setUseTaxPercentage] = useState(true);
  const [currency, setCurrency] = useState<Currency>("DKK");

  const calculateHourlyRate = (monthly: number, hours: number) => {
    return monthly / hours;
  };

  const beforeTaxRate = Number(hourlyRate) || calculateHourlyRate(Number(monthlyIncome), Number(hoursPerMonth));
  const afterTaxRate = useTaxPercentage
    ? calculateAfterTax(beforeTaxRate, Number(taxPercentage) || 0)
    : Number(afterTaxAmount) / (Number(hoursPerMonth) || 1);

  const monthlyBeforeTax = beforeTaxRate * Number(hoursPerMonth);
  const monthlyAfterTax = afterTaxRate * Number(hoursPerMonth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-400 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Earnings Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your earnings based on hourly rate or monthly income
          </p>
        </div>

        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="hourly">Hourly Rate</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Income</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="hourly" className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <SalaryInput
                    hourlyRate={hourlyRate}
                    hoursPerMonth={hoursPerMonth}
                    taxPercentage={taxPercentage}
                    afterTaxAmount={afterTaxAmount}
                    useTaxPercentage={useTaxPercentage}
                    currency={currency}
                    onHourlyRateChange={setHourlyRate}
                    onHoursChange={setHoursPerMonth}
                    onTaxPercentageChange={setTaxPercentage}
                    onAfterTaxAmountChange={setAfterTaxAmount}
                    onUseTaxPercentageChange={setUseTaxPercentage}
                    onCurrencyChange={setCurrency}
                    showMonthlyInput={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly" className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <SalaryInput
                    monthlyIncome={monthlyIncome}
                    hoursPerMonth={hoursPerMonth}
                    taxPercentage={taxPercentage}
                    afterTaxAmount={afterTaxAmount}
                    useTaxPercentage={useTaxPercentage}
                    currency={currency}
                    onMonthlyIncomeChange={setMonthlyIncome}
                    onHoursChange={setHoursPerMonth}
                    onTaxPercentageChange={setTaxPercentage}
                    onAfterTaxAmountChange={setAfterTaxAmount}
                    onUseTaxPercentageChange={setUseTaxPercentage}
                    onCurrencyChange={setCurrency}
                    showMonthlyInput={true}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {((hourlyRate || monthlyIncome) && hoursPerMonth && (useTaxPercentage ? taxPercentage : afterTaxAmount)) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <SalaryCard
                title="Before Tax Earnings"
                hourlyRate={beforeTaxRate}
                hoursPerMonth={Number(hoursPerMonth)}
                currency={currency}
              />
              <SalaryCard
                title="After Tax Earnings"
                hourlyRate={afterTaxRate}
                hoursPerMonth={Number(hoursPerMonth)}
                currency={currency}
              />
            </div>
            <EarningsGraph
              monthlyEarnings={monthlyAfterTax}
              currency={currency}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;