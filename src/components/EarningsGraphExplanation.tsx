import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningsGraphExplanation = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="flex items-left justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="flex justify-start p-0 border-b border-black rounded-none">
            <span className="font-semibold">Understanding Your Growth Projections</span>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-2">
        <div className="space-y-4 text-sm text-gray-600">
          <p>This graph shows three different scenarios for your earnings growth over time:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-semibold">Flat Growth:</span> Simple accumulation of your income without any growth factors.</li>
            <li><span className="font-semibold">Exponential Growth:</span> Your earnings with compound interest applied, showing how your money grows over time.</li>
            <li><span className="font-semibold">Optimized Growth:</span> Combines your regular income with additional savings and investments based on your selected contribution frequency and savings rate.</li>
          </ul>
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Adjustable Factors:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Growth Rate:</span> The annual percentage increase in your investments (e.g., 5% means your money grows by 5% each year)</li>
              <li><span className="font-semibold">Savings Rate:</span> The percentage of your income you set aside for savings and investments</li>
              <li><span className="font-semibold">Contribution Frequency:</span> How often you add to your investments (weekly, monthly, or yearly)</li>
              <li><span className="font-semibold">Time Range:</span> The period over which you want to project your earnings growth</li>
            </ul>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default EarningsGraphExplanation;