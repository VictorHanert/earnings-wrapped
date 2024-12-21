const CURRENCY_RATES = {
  DKK: 1,
  USD: 0.15,
  EUR: 0.13,
};

export type Currency = keyof typeof CURRENCY_RATES;

export const calculateTimeBasedEarnings = (
  hourlyRate: number,
  hoursPerMonth: number,
  currency: Currency = 'DKK'
) => {
  const monthlyIncome = hourlyRate * hoursPerMonth;
  
  // Calculate earnings for different time periods
  const perSecond = monthlyIncome / (30 * 24 * 60 * 60);
  const perMinute = perSecond * 60;
  const perHour = hourlyRate;
  const perDay = perHour * (hoursPerMonth / 30); // Average hours per day
  const perWeek = perDay * 7;
  const perMonth = monthlyIncome;
  const perYear = monthlyIncome * 12;

  // Calculate earnings during actual working hours
  const workingHoursPerDay = hoursPerMonth / 30;
  const actualWorkingSecond = hourlyRate / (60 * 60);
  const actualWorkingMinute = hourlyRate / 60;

  return {
    perSecond,
    perMinute,
    perHour,
    perDay,
    perWeek,
    perMonth,
    perYear,
    actualWorkingSecond,
    actualWorkingMinute,
    workingHoursPerDay
  };
};

export const formatCurrency = (amount: number, currency: Currency = 'DKK') => {
  const symbols = {
    DKK: 'kr',
    USD: '$',
    EUR: '€'
  };

  // If the amount has no decimal places or is a whole number
  if (amount % 1 === 0) {
    return new Intl.NumberFormat('da-DK', {
      maximumFractionDigits: 0,
    }).format(amount) + ' ' + symbols[currency];
  }

  return new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 3,
  }).format(amount) + ' ' + symbols[currency];
};

export const calculateAfterTax = (amount: number, taxPercentage: number) => {
  return amount * (1 - taxPercentage / 100);
};

export const calculateYearlyIncome = (monthlyIncome: number) => {
  return monthlyIncome * 12;
};