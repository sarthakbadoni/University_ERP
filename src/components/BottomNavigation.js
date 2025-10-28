import React from 'react';
import { Button } from './ui/button';
import { 
  Home, 
  BarChart3, 
  FileText, 
  DollarSign, 
  Settings 
} from 'lucide-react';

export default function BottomNavigation({ activeSection, onSectionChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'academic', label: 'Academic', icon: BarChart3 },
    { id: 'circular', label: 'Notice', icon: FileText },
    { id: 'fee', label: 'Fee', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-md border-t border-gray-700 px-2 py-2 z-40 safe-bottom">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onSectionChange(item.id)}
              className={`
                flex flex-col items-center justify-center h-14 min-w-[60px] rounded-lg transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700 active:scale-95'
                }
              `}
            >
              <Icon size={22} className="mb-0.5" />
              <span className="text-[10px] leading-tight">{item.label}</span>
            </Button>
          );
        })}
      </div>
      
      {/* Home indicator for iPhone */}
      <div className="flex justify-center pt-1.5 pb-1">
        <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}