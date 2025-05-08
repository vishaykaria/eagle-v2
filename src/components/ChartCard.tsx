import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

type ChartType = 'line' | 'area' | 'bar' | 'pie';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  type: ChartType;
  dataKey: string | string[];
  colors?: string[];
  labels?: boolean;
  grid?: boolean;
  height?: number;
  totalValue?: number;
  isPercentage?: boolean;
  isCurrency?: boolean;
  currencySymbol?: '£' | '$';
}

const defaultColors = [
  '#4F46E5', // primary-600
  '#10B981', // secondary-500
  '#F59E0B', // accent-500
  '#6366F1', // primary-500
  '#059669', // secondary-600
  '#D97706'  // accent-600
];

const formatValue = (value: number, isPercentage?: boolean, isCurrency?: boolean, currencySymbol: '£' | '$' = '£') => {
  if (typeof value !== 'number') return value;

  if (isPercentage) {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  }

  if (isCurrency) {
    if (value > 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(1)}M`;
    } else if (value > 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(1)}K`;
    }
    return `${currencySymbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return value.toFixed(1);
};

const CustomTooltip = ({ active, payload, label, totalValue, isPercentage, isCurrency, currencySymbol = '£' }: any) => {
  const { convertGBPToUSD } = useCurrencyConversion();

  if (active && payload && payload.length) {
    if (totalValue) {
      const data = payload[0];
      const percentage = data.value;
      const absoluteValue = (percentage / 100) * totalValue;
      const usdValue = convertGBPToUSD(absoluteValue);

      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-900 font-medium">{data.name}</p>
          <p className="text-gray-600">{percentage}%</p>
          <p className="text-gray-900 font-medium">
            £{absoluteValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-gray-600">
            ${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-gray-900 font-medium">
            {entry.name}: {formatValue(entry.value, isPercentage, isCurrency, currencySymbol)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  data,
  type,
  dataKey,
  colors = defaultColors,
  labels = true,
  grid = true,
  height = 300,
  totalValue,
  isPercentage,
  isCurrency,
  currencySymbol = '£'
}) => {
  const renderChart = () => {
    const commonProps = {
      margin: { top: 10, right: 10, left: 0, bottom: 20 },
      className: "chart-container"
    };

    const commonAxisProps = {
      tick: { fill: '#9CA3AF', fontSize: 12 },
      axisLine: { stroke: '#E5E7EB' },
      tickLine: { stroke: '#E5E7EB' }
    };

    switch(type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} {...commonProps}>
              {grid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
              <XAxis 
                dataKey="name" 
                {...commonAxisProps}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis 
                hide={!labels}
                {...commonAxisProps}
                tickFormatter={(value) => formatValue(value, isPercentage, isCurrency, currencySymbol)}
                width={60}
              />
              <Tooltip content={<CustomTooltip isPercentage={isPercentage} isCurrency={isCurrency} currencySymbol={currencySymbol} />} />
              {Array.isArray(dataKey) ? (
                dataKey.map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors[index]}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ fill: colors[index], stroke: '#FFF', strokeWidth: 2, r: 4 }}
                  />
                ))
              ) : (
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={colors[0]} 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                  dot={{ fill: colors[0], stroke: '#FFF', strokeWidth: 2, r: 4 }}
                />
              )}
              {Array.isArray(dataKey) && <Legend />}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} {...commonProps}>
              {grid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
              <XAxis 
                dataKey="name" 
                {...commonAxisProps}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis 
                hide={!labels}
                {...commonAxisProps}
                tickFormatter={(value) => formatValue(value, isPercentage, isCurrency, currencySymbol)}
                width={60}
              />
              <Tooltip content={<CustomTooltip isPercentage={isPercentage} isCurrency={isCurrency} currencySymbol={currencySymbol} />} />
              <Area 
                type="monotone" 
                dataKey={dataKey as string} 
                stroke={colors[0]} 
                fill={colors[0] + '33'} // Add transparency
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} {...commonProps}>
              {grid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
              <XAxis 
                dataKey="name" 
                {...commonAxisProps}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis 
                hide={!labels}
                {...commonAxisProps}
                tickFormatter={(value) => formatValue(value, isPercentage, isCurrency, currencySymbol)}
                width={60}
              />
              <Tooltip content={<CustomTooltip isPercentage={isPercentage} isCurrency={isCurrency} currencySymbol={currencySymbol} />} />
              <Bar dataKey={dataKey as string} radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey as string}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={60}
                paddingAngle={5}
                label={({ value }) => `${value}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip totalValue={totalValue} />} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="px-2 sm:px-4 py-4">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;