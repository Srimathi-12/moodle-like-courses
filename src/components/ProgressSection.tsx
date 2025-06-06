import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProgressDetailItem: React.FC<{ value: number; total: number; label: string; colorClass: string }> = ({ value, total, label, colorClass }) => (
  <div className="flex items-center">
    <div className={`w-1 h-8 ${colorClass} rounded-full mr-3`}></div>
    <div>
      <p className="text-lg font-semibold text-gray-800">{value}/{total}</p>
      <p className="text-xs text-academic-dark-gray">{label}</p>
    </div>
  </div>
);

interface YearProgressData {
  totalHours: number;
  visitedLectures: { value: number; total: number };
  completedTasks: { value: number; total: number };
  progressPercentage: number;
}

const mockProgressData: Record<number, YearProgressData> = {
  2023: {
    totalHours: 120,
    visitedLectures: { value: 60, total: 100 },
    completedTasks: { value: 25, total: 80 },
    progressPercentage: 65,
  },
  2024: {
    totalHours: 134,
    visitedLectures: { value: 75, total: 115 },
    completedTasks: { value: 32, total: 94 },
    progressPercentage: 70,
  },
  2025: {
    totalHours: 150,
    visitedLectures: { value: 90, total: 130 },
    completedTasks: { value: 45, total: 110 },
    progressPercentage: 78,
  },
};

const defaultProgressData: YearProgressData = {
  totalHours: 0,
  visitedLectures: { value: 0, total: 0 },
  completedTasks: { value: 0, total: 0 },
  progressPercentage: 0,
};

const ProgressSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('June'); // Added for clarity, not yet dynamic

  const currentProgress = useMemo(() => {
    return mockProgressData[selectedYear] || defaultProgressData;
  }, [selectedYear]);

  const availableYears = useMemo(() => {
    return Object.keys(mockProgressData).map(Number).sort((a, b) => a - b);
  }, []);

  const handlePreviousYear = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (currentIndex > 0) {
      const newYear = availableYears[currentIndex - 1];
      setSelectedYear(newYear);
      toast({
        title: "Year Changed",
        description: `Selected year: ${newYear}. Progress data updated.`
      });
    } else {
      toast({
        title: "Year Change",
        description: "Already at the earliest available year."
      });
    }
  };

  const handleNextYear = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (currentIndex < availableYears.length - 1) {
      const newYear = availableYears[currentIndex + 1];
      setSelectedYear(newYear);
      toast({
        title: "Year Changed",
        description: `Selected year: ${newYear}. Progress data updated.`
      });
    } else {
      toast({
        title: "Year Change",
        description: "Already at the latest available year."
      });
    }
  };

  const handleYearSelect = (yearString: string) => {
    const newYear = parseInt(yearString, 10);
    setSelectedYear(newYear);
    const yearDataExists = !!mockProgressData[newYear];
    toast({
      title: "Year Changed",
      description: `Selected year: ${newYear}. ${yearDataExists ? 'Progress data updated.' : 'No data for this year, showing defaults.'}`
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-academic-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">My progress</h3>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-academic-blue border-academic-blue hover:bg-academic-light-blue p-2"
            onClick={handlePreviousYear}
            aria-label="Previous year"
            disabled={availableYears.indexOf(selectedYear) === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Select value={selectedYear.toString()} onValueChange={handleYearSelect}>
            <SelectTrigger 
              className="w-auto bg-white text-academic-blue border-academic-blue hover:bg-academic-light-blue text-xs px-3 py-2 h-9"
              aria-label={`Select year, current month ${selectedMonth}`}
            >
              <SelectValue placeholder="Select year">
                {selectedMonth} {selectedYear}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {selectedMonth} {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="bg-white text-academic-blue border-academic-blue hover:bg-academic-light-blue p-2"
            onClick={handleNextYear}
            aria-label="Next year"
            disabled={availableYears.indexOf(selectedYear) === availableYears.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="hsl(var(--academic-blue))"
              strokeWidth="3"
              strokeDasharray={`${currentProgress.progressPercentage}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-academic-blue">{currentProgress.totalHours}</span>
            <span className="text-xs text-academic-dark-gray">Total hours</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2 sm:mt-0 sm:ml-6">
          <ProgressDetailItem 
            value={currentProgress.visitedLectures.value} 
            total={currentProgress.visitedLectures.total} 
            label="Visited lectures" 
            colorClass="bg-academic-blue" 
          />
          <ProgressDetailItem 
            value={currentProgress.completedTasks.value} 
            total={currentProgress.completedTasks.total} 
            label="Completed tasks" 
            colorClass="bg-purple-400" 
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
