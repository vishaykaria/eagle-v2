import React, { useState, useRef } from 'react';
import { BarChart3, Plus, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import { motion } from 'framer-motion';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

const StocksAndSharesISA: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'investments'>('overview');
  const [showAllowanceLabel, setShowAllowanceLabel] = useState(false);
  const { convertGBPToUSD } = useCurrencyConversion();
  const tableRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (tableRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? tableRef.current.scrollLeft - scrollAmount
        : tableRef.current.scrollLeft + scrollAmount;
      
      tableRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };
  
  const portfolioHistoryData = [
    { name: 'Oct', value: 10500 },
    { name: 'Nov', value: 11200 },
    { name: 'Dec', value: 10800 },
    { name: 'Jan', value: 11500 },
    { name: 'Feb', value: 12100 },
    { name: 'Mar', value: 12650 }
  ];

  const performanceHistoryData = [
    { name: '2020', ISA: 6.2, VWRL: 5.8 },
    { name: '2021', ISA: 12.4, VWRL: 11.9 },
    { name: '2022', ISA: -4.5, VWRL: -5.8 },
    { name: '2023', ISA: 8.6, VWRL: 7.9 },
    { name: '2024', ISA: 7.2, VWRL: 6.8 },
    { name: '2025', ISA: 2.8, VWRL: 2.4 }
  ];
  
  const allocationData = [
    { name: 'UK Equities', value: 30 },
    { name: 'US Equities', value: 40 },
    { name: 'Europe Equities', value: 15 },
    { name: 'Emerging Markets', value: 10 },
    { name: 'Bonds', value: 5 }
  ];
  
  const sectorAllocationData = [
    { name: 'Technology', value: 25 },
    { name: 'Financial', value: 20 },
    { name: 'Healthcare', value: 15 },
    { name: 'Consumer', value: 15 },
    { name: 'Energy', value: 10 },
    { name: 'Utilities', value: 5 },
    { name: 'Other', value: 10 }
  ];

  // Account values in GBP
  const totalValue = 12650.80;
  const remainingAllowance = 8640.00;
  const totalContributions = 11360.00;
  const totalReturn = 1290.80;
  const totalReturnPercentage = 11.4;
  const annualReturn = 8.6;
  const monthlyChange = { value: 320.40, percentage: 2.6 };
  const dividendReceived = 68.40;
  
  const totalAllowance = 20000.00; // Annual ISA allowance
  const allowanceUsedPercentage = (totalContributions / totalAllowance) * 100;
  
  // Mock investments data - Updated to direct equities and bonds
  const investments = [
    {
      id: 1,
      name: 'Apple Inc.',
      ticker: 'AAPL',
      allocation: 8,
      value: 1012.06,
      change: { value: 28.40, percentage: 2.8, isPositive: true },
      holding: 5
    },
    {
      id: 2,
      name: 'Microsoft Corp.',
      ticker: 'MSFT',
      allocation: 7,
      value: 885.56,
      change: { value: 15.30, percentage: 1.7, isPositive: true },
      holding: 2
    },
    {
      id: 3,
      name: 'HSBC Holdings',
      ticker: 'HSBA.L',
      allocation: 6,
      value: 759.05,
      change: { value: -5.20, percentage: 0.7, isPositive: false },
      holding: 100
    },
    {
      id: 4,
      name: 'AstraZeneca',
      ticker: 'AZN.L',
      allocation: 6,
      value: 759.05,
      change: { value: 25.80, percentage: 3.4, isPositive: true },
      holding: 8
    },
    {
      id: 5,
      name: 'UK Gilt 4% 2030',
      ticker: 'GB00BN65R313',
      allocation: 5,
      value: 632.54,
      change: { value: -4.80, percentage: 0.8, isPositive: false },
      holding: 600
    },
    {
      id: 6,
      name: 'Volkswagen AG',
      ticker: 'VOW3.DE',
      allocation: 5,
      value: 632.54,
      change: { value: 12.40, percentage: 2.0, isPositive: true },
      holding: 4
    },
    {
      id: 7,
      name: 'Nestlé SA',
      ticker: 'NESN.SW',
      allocation: 5,
      value: 632.54,
      change: { value: 8.90, percentage: 1.4, isPositive: true },
      holding: 6
    },
    {
      id: 8,
      name: 'Samsung Electronics',
      ticker: '005930.KS',
      allocation: 5,
      value: 632.54,
      change: { value: 18.60, percentage: 3.0, isPositive: true },
      holding: 12
    },
    {
      id: 9,
      name: 'US Treasury 3.5% 2028',
      ticker: 'US912828YM69',
      allocation: 5,
      value: 632.54,
      change: { value: -3.20, percentage: 0.5, isPositive: false },
      holding: 650
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stocks & Shares ISA</h1>
            <p className="text-gray-600 mt-1">Tax-efficient investment account</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="px-6 py-5 sm:px-10 sm:py-6 bg-gradient-to-r from-secondary-700 to-secondary-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Stocks & Shares ISA</h3>
                <p className="text-secondary-100">Tax year 2025/2026</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-secondary-100">Portfolio Value</div>
              <div className="text-2xl sm:text-3xl font-bold">£{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-secondary-100 mt-1">${convertGBPToUSD(totalValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
              <div className="flex items-center mt-1 text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                <span className="text-green-400">+£{monthlyChange.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({monthlyChange.percentage}%)</span>
              </div>
              <div className="flex flex-col space-y-2 mt-3 w-full">
                <button className="w-full bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Deposit</span>
                </button>
                <button className="w-full bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Export IRS Form</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 sm:px-10 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-200">
          <div>
            <div className="text-gray-500 text-sm">Total Contributions</div>
            <div className="text-gray-900 font-medium">£{totalContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="text-xs text-gray-500 mt-1">This tax year</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Remaining Allowance</div>
            <div className="text-gray-900 font-medium">£{remainingAllowance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div 
              className="relative mt-2"
              onMouseEnter={() => setShowAllowanceLabel(true)}
              onMouseLeave={() => setShowAllowanceLabel(false)}
            >
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary-600 rounded-full"
                  style={{ width: `${allowanceUsedPercentage}%` }}
                ></div>
              </div>
              {showAllowanceLabel && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap">
                  £{remainingAllowance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Total Return</div>
            <div className="text-gray-900 font-medium">+£{totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="text-xs text-gray-500 mt-1">Since inception</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Total Return %</div>
            <div className="text-gray-900 font-medium">+{totalReturnPercentage}%</div>
            <div className="text-xs text-gray-500 mt-1">Since inception</div>
          </div>
        </div>
        
        <div className="px-6 py-4 sm:px-10 sm:py-6 flex flex-wrap gap-3">
          <div className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-md text-sm flex items-center">
            <svg className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-indigo-700">PFIC Exposure Prevention</span>
          </div>

          <div className="bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md text-sm flex items-center">
            <PieChart className="h-4 w-4 mr-1 text-blue-600" />
            <span className="text-blue-800">9 direct investments in your portfolio</span>
          </div>
          
          <div className="bg-green-50 border border-green-100 px-3 py-1.5 rounded-md text-sm flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-green-600" />
            <span className="text-green-800">Dividend: £{dividendReceived.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} received this month</span>
          </div>
        </div>
      </motion.div>
      
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview' 
                ? 'border-secondary-500 text-secondary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('investments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'investments' 
                ? 'border-secondary-500 text-secondary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Investments
          </button>
        </nav>
      </div>
      
      {activeTab === 'overview' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChartCard
                title="ISA Performance"
                subtitle="Annual returns vs VWRL"
                data={performanceHistoryData}
                type="line"
                dataKey={['ISA', 'VWRL']}
                colors={['#10B981', '#4F46E5']}
                isPercentage={true}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ChartCard
                title="Asset Allocation"
                subtitle="Current portfolio breakdown"
                data={allocationData}
                type="pie"
                dataKey="value"
                colors={['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
                totalValue={totalValue}
              />
            </motion.div>
          </div>
          
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Investment Insights</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-sm text-secondary-700 font-medium">Best Performer</div>
                  <div className="text-xl font-semibold text-secondary-900 mt-1">AstraZeneca</div>
                  <div className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+3.4% this month</span>
                  </div>
                </div>
                
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-sm text-secondary-700 font-medium">Risk Profile</div>
                  <div className="text-xl font-semibold text-secondary-900 mt-1">Balanced</div>
                  <div className="text-xs text-secondary-600 mt-1">Medium volatility</div>
                </div>
                
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-sm text-secondary-700 font-medium">Dividend Yield</div>
                  <div className="text-xl font-semibold text-secondary-900 mt-1">2.1%</div>
                  <div className="text-xs text-secondary-600 mt-1">Projected annual</div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-indigo-800"><span className="text-indigo-700">PFIC Exposure Prevention</span></h4>
                    <p className="text-sm text-indigo-700 mt-1">Eagle Stocks & Shares ISAs exclusively hold direct equities and bonds to help US taxpayers avoid complications with IRS' Passive Foreign Investment Company (PFIC) regulations. This structure eliminates the complex PFIC tax reporting requirements that would apply to holdings in non-US mutual funds and ETFs.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Portfolio recommendation</h4>
                    <p className="text-sm text-blue-700 mt-1">Consider increasing exposure to European equities, which are currently trading at attractive valuations.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">ISA allowance reminder</h4>
                    <p className="text-sm text-yellow-700 mt-1">You still have £{remainingAllowance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${convertGBPToUSD(remainingAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD) of your annual ISA allowance remaining. Consider using it before April 5th to maximize your tax-free investment potential.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ChartCard
              title="Sector Allocation"
              subtitle="Portfolio breakdown by sector"
              data={sectorAllocationData}
              type="pie"
              dataKey="value"
              colors={['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280']}
              totalValue={totalValue}
            />
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Risk Analysis</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Volatility (Standard Deviation)</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-secondary-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">12.5%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Medium volatility compared to FTSE All Share</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Sharpe Ratio</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-secondary-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">1.5</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Good risk-adjusted return</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Maximum Drawdown</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-secondary-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">-15.8%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Largest peak-to-trough decline</p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Risk assessment</h4>
                    <p className="text-sm text-blue-700 mt-1">Your portfolio has a balanced risk profile with moderate volatility. The diversification across different regions and sectors has helped reduce overall risk while maintaining good returns.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Your Investments</h3>
              
              <button className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition-colors text-sm">
                <Plus className="h-4 w-4 mr-1" />
                <span>Buy Investment</span>
              </button>
            </div>
            
            <div className="relative">
              <div 
                ref={tableRef}
                className="overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Holdings</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {investments.map((investment) => (
                      <tr key={investment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                              <div className="text-sm text-gray-500">{investment.ticker}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="text-gray-900">{investment.allocation}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="text-gray-900">£{investment.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className={`flex items-center justify-end ${investment.change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {investment.change.isPositive ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span>{investment.change.isPositive ? '+' : ''}£{investment.change.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({investment.change.percentage}%)</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {investment.holding} {investment.ticker.includes('GB00') || investment.ticker.includes('US912') ? 'nominal' : 'shares'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-secondary-600 hover:text-secondary-900">
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => handleScroll('left')}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => handleScroll('right')}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StocksAndSharesISA;