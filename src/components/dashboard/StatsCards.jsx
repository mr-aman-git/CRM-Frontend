import React from 'react';
import { Users, Target, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCards = ({ summary }) => {
  const cards = [
    { title: 'Total Leads', value: summary?.total || 0, icon: <BarChart3 />, color: 'bg-blue-600', trend: 'Global' },
    { title: 'Interested', value: summary?.interested || 0, icon: <Target />, color: 'bg-indigo-600', trend: 'Hot' },
    { title: 'Closed Deals', value: summary?.closed || 0, icon: <CheckCircle />, color: 'bg-emerald-600', trend: 'Success' },
    { title: 'Conv. Rate', value: summary?.conversionRate || '0%', icon: <TrendingUp />, color: 'bg-orange-500', trend: 'Performance' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${card.color} text-white shadow-lg`}>
              {React.cloneElement(card.icon, { size: 24 })}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{card.trend}</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
          <h3 className="text-3xl font-black text-gray-900">{card.value}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;