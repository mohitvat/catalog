import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const generateSampleData = (baseValue = 62000, fluctuationRange = 500) => {
  const data = [];
  for (let i = 0; i < 168; i++) {
    const date = new Date();
    date.setHours(date.getHours() - (168 - i));
    const fluctuation = (Math.random() - 0.5) * fluctuationRange;
    baseValue += fluctuation;
    data.push({
      name: date.toISOString().slice(0, 13) + ':00', 
      value: Math.max(60000, Math.min(65000, baseValue)), 
    });
  }
  return data;
};

const primaryData = generateSampleData(62000, 500);


const comparisonData = generateSampleData(61000, 400);


const data = primaryData.map((item, index) => ({
  ...item,
  comparisonValue: comparisonData[index].value,
}));

const ChartComponent = ({ isComparing }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={false}
            interval={Math.floor(data.length / 7)}
          />
          <YAxis
            domain={[59000, 66000]}
            tick={false}
          />
          <Tooltip
            formatter={(value, name) => [
              `${value.toFixed(2)} USD`,
              name === 'value' ? 'Primary' : 'Comparison',
            ]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="#bfdbfe"
            fillOpacity={0.3}
            name="Primary"
          />
          {isComparing && (
            <Area
              type="monotone"
              dataKey="comparisonValue"
              stroke="#f97316"
              strokeWidth={2}
              fill="#fed7aa"
              fillOpacity={0.3}
              name="Comparison"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;