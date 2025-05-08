import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, User, Globe, CreditCard, Shield, Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences and security settings</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="md:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    defaultValue="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={showEmail ? "text" : "password"}
                      className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500"
                      defaultValue="john.doe@example.com"
                    />
                    <button
                      onClick={() => setShowEmail(!showEmail)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showEmail ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={showPhone ? "text" : "password"}
                      className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary-500 focus:ring-primary-500"
                      defaultValue="+1 (555) 123-4567"
                    />
                    <button
                      onClick={() => setShowPhone(!showPhone)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPhone ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <Lock className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">
                    Enable
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    Update
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Login History</h3>
                    <p className="text-sm text-gray-500">View your recent login activity</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Payment Settings</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Default Payment Method</h3>
                    <p className="text-sm text-gray-500">Manage your default payment method</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    Update
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Automatic Payments</h3>
                    <p className="text-sm text-gray-500">Manage recurring payments</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <Bell className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-900">Account Activity</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-900">Security Alerts</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-900">Investment Updates</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-900">Marketing Communications</span>
                </label>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Language & Region</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option>Eastern Time (ET)</option>
                  <option>Pacific Time (PT)</option>
                  <option>Greenwich Mean Time (GMT)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <Shield className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Privacy</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-900">Data Analytics</span>
                </label>
                <p className="mt-1 text-xs text-gray-500">Help us improve our services</p>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-900">Personalized Ads</span>
                </label>
                <p className="mt-1 text-xs text-gray-500">See relevant advertisements</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;