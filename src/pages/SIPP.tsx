import React, { useState, useRef } from 'react';
import { LineChart, Briefcase, TrendingUp, Calendar, Download, Plus, TrendingDown, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import { motion } from 'framer-motion';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

const SIPP: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'investments' | 'projections'>('overview');
  const [showContributionsLabel, setShowContributionsLabel] = useState(false);
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
  
  const pensionHistoryData = [
    { name: '2020', Pension: 6.2, VWRL: 5.8 },
    { name: '2021', Pension: 12.4, VWRL: 11.9 },
    { name: '2022', Pension: -4.5, VWRL: -5.8 },
    { name: '2023', Pension: 8.6, VWRL: 7.9 },
    { name: '2024', Pension: 7.2, VWRL: 6.8 },
    { name: '2025', Pension: 2.8, VWRL: 2.4 }
  ];
  
  const contributionsData = [
    { name: '2020', personal: 3600, employer: 5400 },
    { name: '2021', personal: 4000, employer: 6000 },
    { name: '2022', personal: 4200, employer: 6300 },
    { name: '2023', personal: 4400, employer: 6600 },
    { name: '2024', personal: 4600, employer: 6900 },
    { name: '2025', personal: 4800, employer: 7200 }
  ];
  
  const allocationData = [
    { name: 'Global Equities', value: 60 },
    { name: 'UK Equities', value: 15 },
    { name: 'Corporate Bonds', value: 10 },
    { name: 'Government Bonds', value: 10 },
    { name: 'Property', value: 5 }
  ];

  const sectorAllocationData = [
    { name: 'Technology', value: 25 },
    { name: 'Financial Services', value: 20 },
    { name: 'Healthcare', value: 15 },
    { name: 'Consumer Goods', value: 12 },
    { name: 'Industrials', value: 10 },
    { name: 'Energy', value: 8 },
    { name: 'Utilities', value: 5 },
    { name: 'Real Estate', value: 5 }
  ];
  
  const projectionData = [
    { name: '2025', pessimistic: 45000, expected: 46000, optimistic: 47000 },
    { name: '2030', pessimistic: 75000, expected: 90000, optimistic: 105000 },
    { name: '2035', pessimistic: 115000, expected: 145000, optimistic: 175000 },
    { name: '2040', pessimistic: 165000, expected: 220000, optimistic: 275000 },
    { name: '2045', pessimistic: 220000, expected: 320000, optimistic: 420000 },
    { name: '2050', pessimistic: 290000, expected: 450000, optimistic: 610000 }
  ];

  const investments = [
    {
      id: 1,
      name: 'Vanguard FTSE Global All Cap',
      ticker: 'VWRL.L',
      allocation: 40,
      value: 18348.93,
      change: { value: 495.42, percentage: 2.8, isPositive: true },
      holding: 150
    },
    {
      id: 2,
      name: 'iShares Core FTSE 100',
      ticker: 'ISF.L',
      allocation: 15,
      value: 6880.85,
      change: { value: 165.14, percentage: 2.4, isPositive: true },
      holding: 800
    },
    {
      id: 3,
      name: 'Vanguard UK Corporate Bond',
      ticker: 'VUKE.L',
      allocation: 10,
      value: 4587.23,
      change: { value: -45.87, percentage: 1.0, isPositive: false },
      holding: 400
    },
    {
      id: 4,
      name: 'iShares UK Gilts 0-5yr',
      ticker: 'IGLS.L',
      allocation: 10,
      value: 4587.23,
      change: { value: -22.94, percentage: 0.5, isPositive: false },
      holding: 450
    },
    {
      id: 5,
      name: 'iShares Global Property',
      ticker: 'IWDP.L',
      allocation: 5,
      value: 2293.62,
      change: { value: 68.81, percentage: 3.1, isPositive: true },
      holding: 200
    },
    {
      id: 6,
      name: 'Vanguard FTSE Emerging Markets',
      ticker: 'VFEM.L',
      allocation: 12,
      value: 5502.68,
      change: { value: 165.08, percentage: 3.1, isPositive: true },
      holding: 450
    },
    {
      id: 7,
      name: 'iShares MSCI Europe ex-UK',
      ticker: 'IEUX.L',
      allocation: 8,
      value: 3671.78,
      change: { value: 88.12, percentage: 2.5, isPositive: true },
      holding: 300
    }
  ];

  const totalValue = 45872.32;
  const monthlyContribution = 1000;
  const personalContribution = 400;
  const employerContribution = 600;
  const annualAllowanceUsed = 12000;
  const annualAllowanceTotal = 60000;
  const annualAllowancePercentage = (annualAllowanceUsed / annualAllowanceTotal) * 100;
  
  const totalMonthlyContribution = personalContribution + employerContribution;
  const personalContributionPercentage = (personalContribution / totalMonthlyContribution) * 100;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SIPP</h1>
            <p className="text-gray-600 mt-1">Tax-efficient retirement savings</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="px-6 py-5 sm:px-10 sm:py-6 bg-gradient-to-r from-accent-700 to-accent-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <LineChart className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">SIPP</h3>
                <p className="text-accent-100">Tax year 2025/2026</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-accent-100">Portfolio Value</div>
              <div className="text-2xl sm:text-3xl font-bold">£45,872.32</div>
              <div className="text-sm text-accent-100 mt-1">${convertGBPToUSD(45872.32).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
              <div className="flex items-center mt-1 text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                <span className="text-green-400">+£1,230.85 (2.8%)</span>
              </div>
              <div className="flex flex-col space-y-2 mt-3 w-full">
                <button className="w-full bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center justify-center">
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
            <div className="text-gray-500 text-sm">Contributions</div>
            <div className="text-gray-900 font-medium">£{monthlyContribution.toLocaleString()}/month</div>
            <div 
              className="relative mt-2"
              onMouseEnter={() => setShowContributionsLabel(true)}
              onMouseLeave={() => setShowContributionsLabel(false)}
            >
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-600 rounded-full"
                  style={{ width: `${personalContributionPercentage}%` }}
                ></div>
              </div>
              {showContributionsLabel && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap">
                  You: £{personalContribution} | Employer: £{employerContribution}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm">Annual Allowance Left</div>
            <div className="text-gray-900 font-medium">£{annualAllowanceUsed.toLocaleString()} / £{annualAllowanceTotal.toLocaleString()}</div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-600 rounded-full"
                style={{ width: `${annualAllowancePercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm">Lifetime Allowance</div>
            <div className="text-gray-900 font-medium">4.2% used</div>
            <div className="text-xs text-gray-500 mt-1">Of £1,073,100 limit</div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm">Projection</div>
            <div className="text-gray-900 font-medium">£450,000</div>
            <div className="text-xs text-gray-500 mt-1">At age 67 (expected)</div>
          </div>
        </div>
        
        <div className="px-6 py-4 sm:px-10 sm:py-6 flex flex-wrap gap-3">
          <div className="bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md text-sm flex items-center">
            <Briefcase className="h-4 w-4 mr-1 text-blue-600" />
            <span className="text-blue-800">Retirement age: 67</span>
          </div>
          
          <div className="bg-green-50 border border-green-100 px-3 py-1.5 rounded-md text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-green-600" />
            <span className="text-green-800">25 years until retirement</span>
          </div>
        </div>
      </motion.div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview' 
                ? 'border-accent-500 text-accent-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('investments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'investments' 
                ? 'border-accent-500 text-accent-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Investments
          </button>
          <button
            onClick={() => setActiveTab('projections')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'projections' 
                ? 'border-accent-500 text-accent-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Projections
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
                title="Pension Performance"
                subtitle="Annual returns vs VWRL"
                data={pensionHistoryData}
                type="line"
                dataKey={['Pension', 'VWRL']}
                colors={['#F59E0B', '#4F46E5']}
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
              <h3 className="text-lg font-medium text-gray-900">Retirement Planning</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-accent-50 p-4 rounded-lg">
                  <div className="text-sm text-accent-700 font-medium">Current Monthly Income</div>
                  <div className="text-xl font-semibold text-accent-900 mt-1">£5,000</div>
                  <div className="text-xs text-accent-600 mt-1">Before tax</div>
                </div>
                
                <div className="bg-accent-50 p-4 rounded-lg">
                  <div className="text-sm text-accent-700 font-medium">Target Retirement Income</div>
                  <div className="text-xl font-semibold text-accent-900 mt-1">£3,500/month</div>
                  <div className="text-xs text-accent-600 mt-1">70% of current income</div>
                </div>
                
                <div className="bg-accent-50 p-4 rounded-lg">
                  <div className="text-sm text-accent-700 font-medium">Projected Retirement Income</div>
                  <div className="text-xl font-semibold text-accent-900 mt-1">£2,800/month</div>
                  <div className="text-xs text-red-600 mt-1">£700 monthly shortfall</div>
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
                    <h4 className="text-sm font-medium text-yellow-800">Contribution recommendation</h4>
                    <p className="text-sm text-yellow-700 mt-1">To reach your target retirement income of £3,500/month, we recommend increasing your monthly contribution to £600 (currently £400).</p>
                  </div>
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
                    <h4 className="text-sm font-medium text-blue-800">Tax benefits</h4>
                    <p className="text-sm text-blue-700 mt-1">By increasing your pension contribution to £600/month, you could save approximately £960 in tax per year.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : activeTab === 'investments' ? (
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
              colors={['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280', '#14B8A6']}
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
                      <div className="bg-accent-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">12.5%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Medium volatility compared to FTSE All Share</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Sharpe Ratio</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-accent-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">1.5</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Good risk-adjusted return</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Maximum Drawdown</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-accent-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
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
              
              <button className="inline-flex items-center px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors text-sm">
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
                          {investment.holding} shares
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-accent-600 hover:text-accent-900">
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
      ) : (
        <div className="space-y-6">
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Retirement Calculator</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">£</span>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-accent-500 focus:border-accent-500"
                      placeholder="0.00"
                      defaultValue="1000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Age</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm rounded-md" defaultValue="67">
                    <option value="55">55</option>
                    <option value="60">60</option>
                    <option value="65">65</option>
                    <option value="67">67</option>
                    <option value="70">70</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Profile</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm rounded-md" defaultValue="balanced">
                    <option value="conservative">Conservative</option>
                    <option value="balanced">Balanced</option>
                    <option value="adventurous">Adventurous</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500">
                  Update Projections
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ChartCard
              title="Pension Projection"
              subtitle="Estimated pension pot value at retirement"
              data={projectionData}
              type="line"
              dataKey={['pessimistic', 'expected', 'optimistic']}
              colors={['#EF4444', '#F59E0B', '#10B981']}
              height={400}
              isCurrency={true}
              currencySymbol="£"
            />
          </motion.div>
          
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Retirement Scenarios</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="text-sm text-red-700 font-medium">Pessimistic</div>
                  <div className="text-xl font-semibold text-red-900 mt-1">£290,000</div>
                  <div className="text-xs text-red-600 mt-1">Lower market returns</div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="text-sm text-yellow-700 font-medium">Expected</div>
                  <div className="text-xl font-semibold text-yellow-900 mt-1">£450,000</div>
                  <div className="text-xs text-yellow-600 mt-1">Average market returns</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="text-sm text-green-700 font-medium">Optimistic</div>
                  <div className="text-xl font-semibold text-green-900 mt-1">£610,000</div>
                  <div className="text-xs text-green-600 mt-1">Higher market returns</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SIPP;