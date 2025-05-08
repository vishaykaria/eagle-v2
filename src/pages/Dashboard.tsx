import React, { useState } from 'react';
import { Bell, Search, Filter, Download, Plus, User, Globe, CreditCard, Shield, Eye, EyeOff, BarChart3, LineChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccountCard from '../components/AccountCard';
import TransactionList, { Transaction } from '../components/TransactionList';
import ChartCard from '../components/ChartCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { convertGBPToUSD } = useCurrencyConversion();
  const [showTransactionSearch, setShowTransactionSearch] = useState(false);
  
  // Account values
  const currentAccountValue = 3542.19;
  const isaValue = 12650.80;
  const sippValue = 45872.32;
  const totalPortfolioValue = currentAccountValue + isaValue + sippValue;
  const isaRemainingAllowance = 8640.00;
  const monthlySpending = { value: 1790.00, percentage: 12.5, isPositive: false };

  // Mock data for ISA allocation
  const isaAllocationData = [
    { name: 'UK Equities', value: 30 },
    { name: 'US Equities', value: 40 },
    { name: 'Europe Equities', value: 15 },
    { name: 'Emerging Markets', value: 10 },
    { name: 'Bonds', value: 5 }
  ];

  // Mock data for SIPP allocation
  const sippAllocationData = [
    { name: 'Global Equities', value: 60 },
    { name: 'UK Equities', value: 15 },
    { name: 'Bonds', value: 20 },
    { name: 'Property', value: 5 }
  ];

  // Mock data for account balance history
  const accountBalanceData = [
    { name: 'Oct', value: 3250 },
    { name: 'Nov', value: 3320 },
    { name: 'Dec', value: 3380 },
    { name: 'Jan', value: 3400 },
    { name: 'Feb', value: 3480 },
    { name: 'Mar', value: 3542 }
  ];
  
  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: '1',
      date: new Date('2025-03-10'),
      description: 'Salary payment',
      amount: 2500,
      type: 'income',
      category: 'income'
    },
    {
      id: '2',
      date: new Date('2025-03-08'),
      description: 'Tesco',
      amount: -65.20,
      type: 'expense',
      category: 'shopping'
    },
    {
      id: '3',
      date: new Date('2025-03-07'),
      description: 'Costa Coffee',
      amount: -4.75,
      type: 'expense',
      category: 'food'
    },
    {
      id: '4',
      date: new Date('2025-03-05'),
      description: 'ISA contribution',
      amount: -200,
      type: 'transfer',
      category: 'transfer'
    }
  ];

  // Asset class colors
  const assetColors = {
    'Cash': '#6B7280',           // Gray
    'UK Equities': '#4F46E5',    // Primary
    'US Equities': '#10B981',    // Secondary
    'Global Equities': '#10B981', // Blue
    'Europe Equities': '#F59E0B', // Accent
    'Emerging Markets': '#EF4444', // Red
    'Bonds': '#8B5CF6',          // Purple
    'Property': '#EC4899'        // Pink
  };

  // Calculate combined asset allocation
  const calculateCombinedAllocation = () => {
    const combinedMap = new Map();

    // Add Current Account as Cash
    combinedMap.set('Cash', currentAccountValue);

    // Process ISA allocations
    isaAllocationData.forEach(item => {
      const value = (item.value / 100) * isaValue;
      combinedMap.set(item.name, (combinedMap.get(item.name) || 0) + value);
    });

    // Process SIPP allocations
    sippAllocationData.forEach(item => {
      const value = (item.value / 100) * sippValue;
      combinedMap.set(item.name, (combinedMap.get(item.name) || 0) + value);
    });

    // Convert to percentages of total portfolio
    const combined = Array.from(combinedMap.entries()).map(([name, value]) => ({
      name,
      value: Math.round((value / totalPortfolioValue) * 100)
    }));

    // Sort by value descending
    return combined.sort((a, b) => b.value - a.value);
  };

  const combinedAllocationData = calculateCombinedAllocation();

  const handleAccountClick = (path: string) => {
    navigate(path);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}</h1>
            <p className="text-gray-600 mt-1">Here's a summary of your accounts</p>
          </div>
          <button className="bg-primary-50 text-primary-900 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">
            <div className="flex items-center space-x-1">
              <Download className="h-8 w-8" />
              <span>Export IRS Forms</span>
            </div>
          </button>
        </div>
      </motion.div>
      
      {/* Account cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div onClick={() => handleAccountClick('/current-account')} className="cursor-pointer">
          <AccountCard
            title="Current Account"
            balance={`$${convertGBPToUSD(currentAccountValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={{
              value: `$${convertGBPToUSD(monthlySpending.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              percentage: `${monthlySpending.percentage}%`,
              isPositive: monthlySpending.isPositive
            }}
            icon={<CreditCard className="h-5 w-5" />}
            color="border-primary-500"
            link="/current-account"
            delay={1}
          />
        </div>
        
        <div onClick={() => handleAccountClick('/isa')} className="cursor-pointer">
          <AccountCard
            title="Stocks & Shares ISA"
            balance={`$${convertGBPToUSD(isaValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={{
              value: `$${convertGBPToUSD(320.40).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              percentage: "2.6%",
              isPositive: true
            }}
            icon={<BarChart3 className="h-5 w-5" />}
            color="border-secondary-500"
            link="/isa"
            delay={2}
          />
        </div>
        
        <div onClick={() => handleAccountClick('/sipp')} className="cursor-pointer">
          <AccountCard
            title="SIPP"
            balance={`$${convertGBPToUSD(sippValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={{
              value: `$${convertGBPToUSD(1230.85).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              percentage: "2.8%",
              isPositive: true
            }}
            icon={<LineChart className="h-5 w-5" />}
            color="border-accent-500"
            link="/sipp"
            delay={3}
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setShowTransactionSearch(!showTransactionSearch)}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
          
          <AnimatePresence>
            {showTransactionSearch && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={handleSearchClick}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filter</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <TransactionList transactions={transactions} title="" />
      </motion.div>

      {/* Financial Insights */}
      <motion.div
        className="bg-white rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Financial Insights</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-green-800">Spending lower than last month</h4>
                <p className="text-sm text-green-700 mt-1">You've spent 12% less this month compared to last month. Keep it up!</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">ISA allowance reminder</h4>
                <p className="text-sm text-blue-700 mt-1">You still have ${convertGBPToUSD(isaRemainingAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} of your annual ISA allowance remaining. Consider using it before April 5th.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-purple-800">Pension contribution optimization</h4>
                <p className="text-sm text-purple-700 mt-1">Increasing your SIPP contribution by 3% could reduce your tax bill by an estimated $480 this year.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Asset Allocation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChartCard
          title="Asset Allocation"
          subtitle="Your combined investment portfolio breakdown"
          data={combinedAllocationData}
          type="pie"
          dataKey="value"
          colors={combinedAllocationData.map(item => assetColors[item.name as keyof typeof assetColors])}
          totalValue={totalPortfolioValue}
        />
      </motion.div>

      {/* Account Balance History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChartCard
          title="Account Balance History"
          subtitle="Current account balance over the last 6 months"
          data={accountBalanceData}
          type="area"
          dataKey="value"
          colors={['#4F46E5']}
          isCurrency={true}
          currencySymbol="£"
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;