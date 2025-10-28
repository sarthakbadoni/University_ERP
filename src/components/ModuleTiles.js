import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  GraduationCap, 
  DollarSign, 
  FileText, 
  BookOpen, 
  Building, 
  BedSingle, 
  MessageSquare 
} from 'lucide-react';

export default function ModuleTiles({ onSectionChange }) {
  const modules = [
    { 
      id: 'academic', 
      label: 'Academic', 
      icon: GraduationCap, 
      color: 'from-purple-500 to-purple-600',
      bgIcon: '🎓'
    },
    { 
      id: 'fee', 
      label: 'Fee', 
      icon: DollarSign, 
      color: 'from-green-500 to-green-600',
      bgIcon: '💳'
    },
    { 
      id: 'circular', 
      label: 'Circular', 
      icon: FileText, 
      color: 'from-orange-500 to-orange-600',
      bgIcon: '📢'
    },
    { 
      id: 'exam', 
      label: 'Exam', 
      icon: BookOpen, 
      color: 'from-red-500 to-red-600',
      bgIcon: '📝'
    },
    { 
      id: 'placement', 
      label: 'Placement', 
      icon: Building, 
      color: 'from-blue-500 to-blue-600',
      bgIcon: '🏢'
    },
    { 
      id: 'hostel', 
      label: 'Hostel', 
      icon: BedSingle, 
      color: 'from-teal-500 to-teal-600',
      bgIcon: '🏠'
    },
    { 
      id: 'grievance', 
      label: 'Grievance', 
      icon: MessageSquare, 
      color: 'from-pink-500 to-pink-600',
      bgIcon: '📢'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 sm:p-6 rounded-xl sm:rounded-2xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => onSectionChange(module.id)}
              className="group focus:outline-none"
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 active:bg-white/30 transition-all duration-300 group-hover:scale-105 group-focus:scale-105 group-active:scale-95">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="mb-2 sm:mb-3 flex justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">{module.bgIcon}</span>
                    </div>
                  </div>
                  <p className="text-white text-xs sm:text-sm font-medium">{module.label}</p>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}