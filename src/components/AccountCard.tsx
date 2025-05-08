import React from 'react';
import { motion } from 'framer-motion';

interface AccountCardProps {
  title: string;
  balance: string;
  change?: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color: string;
  link: string;
  delay?: number;
}

const AccountCard: React.FC<AccountCardProps> = ({ 
  title, 
  balance, 
  change, 
  icon, 
  color,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${color} h-full min-h-[120px]`}
    >
      <div className="p-4 sm:p-5 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color.replace('border-', 'bg-').replace('-500', '-100')} ${color.replace('border-', 'text-')}`}>
              {icon}
            </div>
            <h3 className="text-base sm:text-4xl font-semibold text-gray-900">{title}</h3>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 flex-grow">
          <div className="text-lg sm:text-2xl font-semibold text-gray-900">{balance}</div>
          
          {change && (
            <div className="flex items-center mt-1">
              <span className={`text-xs sm:text-sm ${change.isPositive ? 'text-success' : 'text-error'}`}>
                {change.isPositive ? '+' : ''}{change.value} ({change.percentage})
              </span>
              
              <svg 
                className={`h-3 w-3 sm:h-4 sm:w-4 ml-1 ${change.isPositive ? 'text-success' : 'text-error'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {change.isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                )}
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountCard;