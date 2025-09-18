'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DURATIONS = [
  { value: 60, label: '1 Minute' },
  { value: 300, label: '5 Minutes' },
  { value: 600, label: '10 Minutes' },
  { value: 900, label: '15 Minutes' },
];

export default function Timer() {
  const [duration, setDuration] = useState(DURATIONS[1].value);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Optional: Add a notification or sound
    }
  }, [isRunning, timeLeft]);

  const handleDurationChange = (value: string) => {
    const newDuration = parseInt(value, 10);
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    resetTimer();
  }, [duration, resetTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Creative Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="font-mono text-6xl font-bold tracking-tighter w-full text-center bg-muted rounded-lg py-4">
          {formatTime(timeLeft)}
        </div>
        <div className="w-full">
          <Select
            onValueChange={handleDurationChange}
            defaultValue={String(duration)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((d) => (
                <SelectItem key={d.value} value={String(d.value)}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full justify-center gap-4">
          <Button onClick={toggleTimer} size="lg" className="flex-1">
            {isRunning ? (
              <Pause className="mr-2" />
            ) : (
              <Play className="mr-2" />
            )}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            size="lg"
            aria-label="Reset Timer"
          >
            <RotateCcw />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
