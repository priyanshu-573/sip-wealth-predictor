import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  // Logic----------
  const i = returnRate / 12 / 100;
  const n = years * 12;
  const totalInvested = monthlyInvestment * n;
  const futureValue = monthlyInvestment * (((Math.pow(1 + i, n)) - 1) / i) * (1 + i);
  const estReturns = futureValue - totalInvested;

  // Graph----------
  const generateChartData = () => {
    const data = [];
    for (let y = 1; y <= years; y++) {
      const months = y * 12;
      const val = monthlyInvestment * (((Math.pow(1 + i, months)) - 1) / i) * (1 + i);
      data.push({
        year: `Year ${y}`,
        value: Math.round(val),
        invested: monthlyInvestment * months
      });
    }
    return data;
  };

  
  const formatCurrency = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakh`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f3f7', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <h2 style={{ textAlign: 'center', color: '#1a202c', marginBottom: '30px' }}>SIP Wealth Predictor</h2>
        

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Controls */}
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ color: '#4a5568', fontWeight: 'bold' }}>Monthly SIP</label>
                <span style={{ color: '#00d09c', fontWeight: 'bold', backgroundColor: '#e6fff9', padding: '2px 10px', borderRadius: '5px' }}>₹{monthlyInvestment.toLocaleString('en-IN')}</span>
              </div>
              <input type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} style={{ width: '100%', accentColor: '#00d09c' }} />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ color: '#4a5568', fontWeight: 'bold' }}>Expected Return (p.a)</label>
                <span style={{ color: '#00d09c', fontWeight: 'bold', backgroundColor: '#e6fff9', padding: '2px 10px', borderRadius: '5px' }}>{returnRate}%</span>
              </div>
              <input type="range" min="1" max="30" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} style={{ width: '100%', accentColor: '#00d09c' }} />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ color: '#4a5568', fontWeight: 'bold' }}>Time Period</label>
                <span style={{ color: '#00d09c', fontWeight: 'bold', backgroundColor: '#e6fff9', padding: '2px 10px', borderRadius: '5px' }}>{years} Yr</span>
              </div>
              <input type="range" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ width: '100%', accentColor: '#00d09c' }} />
            </div>
          </div>

          {/* Graph Display */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generateChartData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf2f7" />
                <XAxis dataKey="year" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  formatter={(value) => formatCurrency(value)} 
                />
                <Area type="monotone" dataKey="value" stroke="#00d09c" strokeWidth={3} fill="#00d09c" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- STATS SUMMARY --- */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          backgroundColor: 'white', 
          padding: '35px 20px', 
          borderRadius: '20px', 
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
          textAlign: 'center'
        }}>
          <div>
            <p style={{ color: '#718096', marginBottom: '10px', fontSize: '14px', fontWeight: '500' }}>Invested amount</p>
            <h2 style={{ color: '#2d3748', margin: 0, fontSize: '22px', fontWeight: 'bold' }}>{formatCurrency(totalInvested)}</h2>
          </div>

          <div style={{ borderLeft: '2px solid #edf2f7', height: '50px' }}></div>

          <div>
            <p style={{ color: '#718096', marginBottom: '10px', fontSize: '14px', fontWeight: '500' }}>Est. returns</p>
            <h2 style={{ color: '#2d3748', margin: 0, fontSize: '22px', fontWeight: 'bold' }}>{formatCurrency(estReturns)}</h2>
          </div>

          <div style={{ borderLeft: '2px solid #edf2f7', height: '50px' }}></div>

          <div>
            <p style={{ color: '#718096', marginBottom: '10px', fontSize: '14px', fontWeight: '500' }}>Total value</p>
            <h2 style={{ color: '#00d09c', margin: 0, fontSize: '22px', fontWeight: 'bold' }}>{formatCurrency(futureValue)}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}