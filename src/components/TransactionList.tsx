import React from 'react';
import { CreditCard, ShoppingBag, Coffee, ArrowUpRight, ArrowDownLeft, Plus, Minus, ArrowLeftRight } from 'lucide-react';
import { format } from 'date-fns';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'shopping':
      return <ShoppingBag className="h-4 w-4" />;
    case 'food':
      return <Coffee className="h-4 w-4" />;
    case 'income':
      return <ArrowDownLeft className="h-4 w-4" />;
    case 'transfer':
      return <ArrowLeftRight className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, title = "Recent Transactions" }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {title && (
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      
      <div className="divide-y divide-gray-200">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="px-4 sm:px-6 py-3 sm:py-4 flex items-center">
              <div className={`p-2 rounded-lg mr-3 sm:mr-4 ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-600' 
                  : transaction.type === 'expense'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-blue-100 text-blue-600'
              }`}>
                {getCategoryIcon(transaction.category)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{transaction.description}</p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {format(transaction.date, 'dd MMM yyyy')} • {transaction.category}
                </p>
              </div>
              
              <div className="flex items-center ml-3">
                <span className={`text-sm sm:text-base font-medium ${
                  transaction.type === 'income' 
                    ? 'text-green-600' 
                    : transaction.type === 'expense'
                      ? 'text-red-600'
                      : 'text-blue-600'
                }`}>
                  {transaction.type === 'income' && <Plus className="h-3 w-3 inline mr-0.5" />}
                  {transaction.type === 'expense' && <Minus className="h-3 w-3 inline mr-0.5" />}
                  £{Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 sm:px-6 py-6 sm:py-8 text-center">
            <p className="text-sm sm:text-base text-gray-500">No transactions to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;