import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, title, value, change, color = 'stone' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-gray-600">{title}</span>
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-5 h-5 text-${color}-900`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <p className={`text-xs mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
