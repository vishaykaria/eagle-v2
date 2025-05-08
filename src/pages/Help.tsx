import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const Help: React.FC = () => {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is Eagle Banking?',
          a: 'Eagle Banking is a digital bank offering current accounts, investment accounts (ISA), and pension services (SIPP) all in one place.'
        },
        {
          q: 'Is Eagle Banking regulated?',
          a: 'Yes, Eagle Banking is regulated by the Financial Conduct Authority (FCA) and your deposits are protected by the Financial Services Compensation Scheme (FSCS) up to £85,000.'
        },
        {
          q: 'How do I contact customer support?',
          a: 'You can reach our customer support team 24/7 through in-app chat, email at support@eaglebanking.com, or phone at 0800 123 4567.'
        }
      ]
    },
    {
      category: 'Current Account',
      questions: [
        {
          q: 'How do I open a current account?',
          a: 'To open a current account, you need to be 18 or over and a UK resident. Simply click "Open Account" and follow the verification process.'
        },
        {
          q: 'What are the account fees?',
          a: 'Our current account has no monthly fees. However, certain services like international transfers may incur charges.'
        },
        {
          q: 'Can I use my card abroad?',
          a: 'Yes, you can use your Eagle Banking card worldwide. We offer competitive exchange rates and no foreign transaction fees.'
        }
      ]
    },
    {
      category: 'Stocks & Shares ISA',
      questions: [
        {
          q: 'What is a Stocks & Shares ISA?',
          a: 'A Stocks & Shares ISA is a tax-efficient investment account that allows you to invest in stocks, bonds, and funds without paying tax on capital gains or dividends.'
        },
        {
          q: 'What is the ISA allowance?',
          a: 'The ISA allowance for the 2025/26 tax year is £20,000. This is the maximum amount you can invest across all your ISAs in one tax year.'
        },
        {
          q: 'How do I transfer an existing ISA?',
          a: 'You can transfer existing ISAs by selecting "Transfer ISA" in your account. We\'ll handle the transfer process with your current provider.'
        }
      ]
    },
    {
      category: 'SIPP',
      questions: [
        {
          q: 'What is a SIPP?',
          a: 'A Self-Invested Personal Pension (SIPP) is a pension wrapper that lets you save, invest and manage your retirement savings tax-efficiently.'
        },
        {
          q: 'What are the tax benefits?',
          a: 'You receive tax relief on your pension contributions. Basic rate taxpayers get 20% relief, while higher and additional rate taxpayers can claim additional relief.'
        },
        {
          q: 'When can I access my SIPP?',
          a: 'You can access your SIPP from age 55 (rising to 57 in 2028). You can take up to 25% as a tax-free lump sum.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600 mt-1">Find answers to common questions about Eagle Banking</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Contact Support</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex-shrink-0">
                <HelpCircle className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-primary-900">24/7 Customer Support</h3>
                <p className="text-primary-700">We're here to help you anytime</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Phone Support</h3>
                <p className="text-gray-600">0800 123 4567</p>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-gray-600">support@eaglebanking.com</p>
                <p className="text-sm text-gray-500">Response within 2 hours</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Live Chat</h3>
                <p className="text-gray-600">Available in-app</p>
                <p className="text-sm text-gray-500">Instant response</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Links</h2>
          </div>
          
          <div className="p-6 grid grid-cols-2 gap-4">
            <a href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-900">Security Center</h3>
              <p className="text-sm text-gray-600 mt-1">Learn about our security measures</p>
            </a>
            
            <a href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-900">User Guides</h3>
              <p className="text-sm text-gray-600 mt-1">Step-by-step tutorials</p>
            </a>
            
            <a href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-900">Banking Terms</h3>
              <p className="text-sm text-gray-600 mt-1">Glossary of banking terms</p>
            </a>
            
            <a href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-900">Legal Documents</h3>
              <p className="text-sm text-gray-600 mt-1">Terms and conditions</p>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-white rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {faqs.map((category, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">{category.category}</h3>
                <ChevronDown className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" />
              </summary>
              
              <div className="px-6 pb-4 space-y-4">
                {category.questions.map((item, qIndex) => (
                  <div key={qIndex} className="space-y-2">
                    <h4 className="font-medium text-gray-900">{item.q}</h4>
                    <p className="text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Help;