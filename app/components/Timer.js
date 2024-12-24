'use client';
import { useEffect, useState } from 'react';

export default function Timer({ startTime }) {
  const [timeLeft, setTimeLeft] = useState('Calculating...');

  useEffect(() => {
    if (!startTime) {
      setTimeLeft('Invalid start time');
      return;
    }

    const parsedStartTime = new Date(startTime);
    if (isNaN(parsedStartTime.getTime())) {
      setTimeLeft('Invalid start time');
      return;
    }

    const interval = setInterval(() => {
      const diff = parsedStartTime - new Date();
      if (diff <= 0) {
        setTimeLeft('Contest Started');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return <span>{timeLeft}</span>;
}
