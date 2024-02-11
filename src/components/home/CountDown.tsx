'use client';

import React, { useEffect, useState } from 'react';
import { calculateTimeLeft } from '@/utils';

type CountDownProps = {
  targetDate: Date | number;
};

export default function CountDown({ targetDate }: CountDownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <span className="countdown font-mono text-2xl">
      <span style={{ '--value': timeLeft.hours } as any}></span>:
      <span style={{ '--value': timeLeft.minutes } as any}></span>:
      <span style={{ '--value': timeLeft.seconds } as any}></span>
    </span>
  );
}
