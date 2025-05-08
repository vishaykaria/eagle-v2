import React, { useState } from 'react';
import { Bell, Search, Filter, Download, ArrowLeftRight, User, Globe, CreditCard, Shield, Eye, EyeOff } from 'lucide-react';
import TransactionList, { Transaction } from '../components/TransactionList';
import ChartCard from '../components/ChartCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

const CurrentAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'analytics'>('transactions');
  const [showTransactionSearch, setShowTransactionSearch] = useState(false);
  const { convertGBPToUSD } = useCurrencyConversion();
  
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
      date: new Date('2025-03-06'),
      description: 'Amazon',
      amount: -29.99,
      type: 'expense',
      category: 'shopping'
    },
    {
      id: '5',
      date: new Date('2025-03-05'),
      description: 'ISA contribution',
      amount: -200,
      type: 'transfer',
      category: 'transfer'
    },
    {
      id: '6',
      date: new Date('2025-03-03'),
      description: 'Phone bill',
      amount: -45.99,
      type: 'expense',
      category: 'bills'
    },
    {
      id: '7',
      date: new Date('2025-03-01'),
      description: 'Rent payment',
      amount: -800,
      type: 'expense',
      category: 'housing'
    }
  ];
  
  // Monthly spending values and calculated percentages
  const totalMonthlySpending = 1790;
  const spendingCategoryData = [
    { name: 'Housing', value: 800, percentage: Math.round((800/totalMonthlySpending) * 100) },
    { name: 'Food & Dining', value: 350, percentage: Math.round((350/totalMonthlySpending) * 100) },
    { name: 'Transportation', value: 250, percentage: Math.round((250/totalMonthlySpending) * 100) },
    { name: 'Bills & Utilities', value: 200, percentage: Math.round((200/totalMonthlySpending) * 100) },
    { name: 'Shopping', value: 120, percentage: Math.round((120/totalMonthlySpending) * 100) },
    { name: 'Entertainment', value: 70, percentage: Math.round((70/totalMonthlySpending) * 100) }
  ];
  
  const monthlySpendingData = [
    { name: 'Jan', value: 1650 },
    { name: 'Feb', value: 1720 },
    { name: 'Mar', value: 1790 },
    { name: 'Apr', value: 1680 },
    { name: 'May', value: 1590 },
    { name: 'Jun', value: 1490 }
  ];

  const totalSpending = spendingCategoryData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Current Account</h1>
            <p className="text-gray-600 mt-1">Manage your daily banking needs</p>
          </div>
        </div>
      </motion.div>
      
      {/* Account overview card */}
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="px-6 py-5 sm:px-10 sm:py-6 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Current Account</h3>
                <p className="text-primary-100">**** **** **** 4519</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-primary-100">Available Balance</div>
              <div className="text-2xl sm:text-3xl font-bold">£3,542.19</div>
              <div className="text-sm text-primary-100 mt-1">$4,498.58 USD</div>
              <div className="flex flex-col space-y-2 mt-3 w-full">
                <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  <span>Transfer</span>
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
            <div className="text-gray-500 text-sm">Daily Limit</div>
            <div className="text-gray-900 font-medium">£2,000</div>
            <div className="text-xs text-gray-500 mt-1">Card spending limit</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Monthly Spending</div>
            <div className="text-gray-900 font-medium">£1,790</div>
            <div className="text-xs text-gray-500 mt-1">This month to date</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Standing Orders</div>
            <div className="text-gray-900 font-medium">3 Active</div>
            <div className="text-xs text-gray-500 mt-1">Next: Mar 25 (£450)</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Direct Debits</div>
            <div className="text-gray-900 font-medium">5 Active</div>
            <div className="text-xs text-gray-500 mt-1">Next: Mar 28 (£65)</div>
          </div>
        </div>
      </motion.div>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'transactions' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      {activeTab === 'transactions' ? (
        <div className="space-y-6">
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
                    onClick={(e) => e.stopPropagation()}
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
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChartCard
                title="Spending by Category"
                subtitle="This month's spending breakdown"
                data={spendingCategoryData.map(item => ({ name: item.name, value: item.percentage }))}
                type="pie"
                dataKey="value"
                colors={['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']}
                totalValue={totalSpending}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ChartCard
                title="Monthly Spending"
                subtitle="Last 6 months spending trends"
                data={monthlySpendingData}
                type="bar"
                dataKey="value"
                colors={['#4F46E5']}
                isCurrency={true}
                currencySymbol="£"
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
              <h3 className="text-lg font-medium text-gray-900">Spending Insights</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="text-sm text-primary-700 font-medium">Average Daily Spend</div>
                  <div className="text-2xl font-semibold text-primary-900 mt-1">£57.74</div>
                  <div className="text-xs text-primary-600 mt-1">2.8% higher than last month</div>
                </div>
                
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-sm text-secondary-700 font-medium">Top Spending Category</div>
                  <div className="text-2xl font-semibold text-secondary-900 mt-1">Housing</div>
                  <div className="text-xs text-secondary-600 mt-1">£800 this month</div>
                </div>
                
                <div className="bg-accent-50 p-4 rounded-lg">
                  <div className="text-sm text-accent-700 font-medium">Money In vs Out</div>
                  <div className="text-2xl font-semibold text-accent-900 mt-1">+£710</div>
                  <div className="text-xs text-accent-600 mt-1">Positive cash flow this month</div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-green-800">Potential savings found</h4>
                    <p className="text-sm text-green-700 mt-1">We've identified £120/month in potential savings from subscriptions you rarely use.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Budget goal progress</h4>
                    <p className="text-sm text-blue-700 mt-1">You're on track to meet your monthly saving goal. Keep it up!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CurrentAccount;