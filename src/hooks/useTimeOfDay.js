import { useEffect, useState } from 'react';

const NIGHT_START_HOUR = 20; // 8pm
const NIGHT_END_HOUR = 6; // 6am

function getIsNight() {
  const hour = new Date().getHours();
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
}

export function useTimeOfDay() {
  const [isNight, setIsNight] = useState(getIsNight);

  useEffect(() => {
    const id = setInterval(() => setIsNight(getIsNight()), 60_000);
    return () => clearInterval(id);
  }, []);

  return isNight;
}
