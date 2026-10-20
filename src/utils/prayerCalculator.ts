// Astronomical Prayer Times Calculation Engine
// Complies with standard astronomical formulas (Jean Meeus, Astronomical Algorithms)

export interface CalculationMethod {
  id: string;
  name: string;
  fajrAngle: number;
  ishaAngle: number;
  isIshaInterval?: boolean;
  ishaIntervalMinutes?: number;
}

export const CALCULATION_METHODS: Record<string, CalculationMethod> = {
  MWL: {
    id: 'MWL',
    name: 'Muslim World League (Fajr 18°, Isha 17°)',
    fajrAngle: 18,
    ishaAngle: 17,
  },
  EGYPT: {
    id: 'EGYPT',
    name: 'Egyptian General Authority (Fajr 19.5°, Isha 17.5°)',
    fajrAngle: 19.5,
    ishaAngle: 17.5,
  },
  ISNA: {
    id: 'ISNA',
    name: 'Islamic Society of North America (Fajr 15°, Isha 15°)',
    fajrAngle: 15,
    ishaAngle: 15,
  },
  MAKKAH: {
    id: 'MAKKAH',
    name: 'Umm al-Qura University, Makkah (Fajr 18.5°, Isha 90 min)',
    fajrAngle: 18.5,
    ishaAngle: 0,
    isIshaInterval: true,
    ishaIntervalMinutes: 90,
  },
  KARACHI: {
    id: 'KARACHI',
    name: 'University of Islamic Sciences, Karachi (Fajr 18°, Isha 18°)',
    fajrAngle: 18,
    ishaAngle: 18,
  },
};

export interface CityPreset {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // standard UTC offset in hours
}

export const PRESET_CITIES: CityPreset[] = [
  { name: 'Mogadishu', country: 'Somalia', latitude: 2.0469, longitude: 45.3182, timezone: 3 },
  { name: 'Hargeisa', country: 'Somalia', latitude: 9.5624, longitude: 44.0770, timezone: 3 },
  { name: 'Nairobi', country: 'Kenya', latitude: -1.2921, longitude: 36.8219, timezone: 3 },
  { name: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357, timezone: 3 },
  { name: 'Mecca', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262, timezone: 3 },
  { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 1 },
  { name: 'Minneapolis', country: 'United States', latitude: 44.9778, longitude: -93.2650, timezone: -5 },
  { name: 'Columbus', country: 'United States', latitude: 39.9612, longitude: -82.9988, timezone: -4 },
  { name: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: -4 },
  { name: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784, timezone: 3 },
  { name: 'Dubai', country: 'UAE', latitude: 25.2048, longitude: 55.2708, timezone: 4 },
];

export interface FormattedPrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  rawDates: {
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
  };
}

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

function getJulianDay(date: Date): number {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5
  );
}

function sunPosition(julianDay: number) {
  const D = julianDay - 2451545.0;
  const g = 357.529 + 0.98560028 * D;
  const q = 280.459 + 0.98564736 * D;
  const L = q + 1.915 * Math.sin(rad(g)) + 0.02 * Math.sin(rad(2 * g));

  const e = 23.439 - 0.00000036 * D;
  const RA = deg(Math.atan2(Math.cos(rad(e)) * Math.sin(rad(L)), Math.cos(rad(L)))) / 15;
  const declination = deg(Math.asin(Math.sin(rad(e)) * Math.sin(rad(L))));
  const EqT = q / 15 - (RA < 0 ? RA + 24 : RA);

  return { declination, equationOfTime: EqT };
}

function hourAngle(latitude: number, declination: number, angle: number): number {
  const cosH =
    (Math.sin(rad(-angle)) - Math.sin(rad(latitude)) * Math.sin(rad(declination))) /
    (Math.cos(rad(latitude)) * Math.cos(rad(declination)));
  if (cosH > 1) return 0; // sun never rises
  if (cosH < -1) return 180; // sun never sets
  return deg(Math.acos(cosH));
}

function asrHourAngle(latitude: number, declination: number, factor: number = 1): number {
  const cot = factor + Math.tan(rad(Math.abs(latitude - declination)));
  const alt = deg(Math.atan(1 / cot));
  const cosH =
    (Math.sin(rad(alt)) - Math.sin(rad(latitude)) * Math.sin(rad(declination))) /
    (Math.cos(rad(latitude)) * Math.cos(rad(declination)));
  if (cosH > 1) return 0;
  if (cosH < -1) return 180;
  return deg(Math.acos(cosH));
}

export function calculatePrayerTimes(
  date: Date = new Date(),
  latitude: number = 2.0469, // Mogadishu default
  longitude: number = 45.3182,
  methodKey: string = 'MWL'
): FormattedPrayerTimes {
  const method = CALCULATION_METHODS[methodKey] || CALCULATION_METHODS.MWL;
  const jd = getJulianDay(date);
  const { declination, equationOfTime } = sunPosition(jd);

  // Timezone in hours for current date
  const timezoneOffsetHours = -date.getTimezoneOffset() / 60;

  // Solar noon
  const transit = 12 + timezoneOffsetHours - longitude / 15 - equationOfTime;

  // Sunrise and Sunset (sun altitude is -0.833° accounting for refraction and semi-diameter)
  const sunHalfDay = hourAngle(latitude, declination, 0.833) / 15;
  const sunriseHours = transit - sunHalfDay;
  const sunsetHours = transit + sunHalfDay;

  // Fajr
  const fajrHours = transit - hourAngle(latitude, declination, method.fajrAngle) / 15;

  // Dhuhr (solar noon + ~1-2 min buffer)
  const dhuhrHours = transit + 2 / 60;

  // Asr (Shafi'i/Standard shadow factor = 1)
  const asrHours = transit + asrHourAngle(latitude, declination, 1) / 15;

  // Maghrib (at sunset + 2 min buffer)
  const maghribHours = sunsetHours + 2 / 60;

  // Isha
  let ishaHours: number;
  if (method.isIshaInterval && method.ishaIntervalMinutes) {
    ishaHours = maghribHours + method.ishaIntervalMinutes / 60;
  } else {
    ishaHours = transit + hourAngle(latitude, declination, method.ishaAngle) / 15;
  }

  const hoursToDate = (hoursFraction: number): Date => {
    const d = new Date(date);
    let h = Math.floor(hoursFraction);
    let m = Math.floor((hoursFraction - h) * 60);
    let s = Math.floor(((hoursFraction - h) * 60 - m) * 60);
    if (h >= 24) h = h % 24;
    if (h < 0) h = (h + 24) % 24;
    d.setHours(h, m, s, 0);
    return d;
  };

  const rawDates = {
    fajr: hoursToDate(fajrHours),
    sunrise: hoursToDate(sunriseHours),
    dhuhr: hoursToDate(dhuhrHours),
    asr: hoursToDate(asrHours),
    maghrib: hoursToDate(maghribHours),
    isha: hoursToDate(ishaHours),
  };

  const formatTime = (d: Date): string => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return {
    fajr: formatTime(rawDates.fajr),
    sunrise: formatTime(rawDates.sunrise),
    dhuhr: formatTime(rawDates.dhuhr),
    asr: formatTime(rawDates.asr),
    maghrib: formatTime(rawDates.maghrib),
    isha: formatTime(rawDates.isha),
    rawDates,
  };
}

// Calculate Qibla bearing from coordinates to Kaaba (21.422487, 39.826206)
export function calculateQiblaDirection(latitude: number, longitude: number): number {
  const meccaLat = 21.422487;
  const meccaLng = 39.826206;

  const lat1 = rad(latitude);
  const lat2 = rad(meccaLat);
  const dLng = rad(meccaLng - longitude);

  const y = Math.sin(dLng);
  const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);

  let qibla = deg(Math.atan2(y, x));
  qibla = (qibla + 360) % 360;
  return Math.round(qibla);
}

// Get the current prayer and next prayer
export function getPrayerStatus(prayerTimes: FormattedPrayerTimes, now: Date = new Date()) {
  const times = [
    { name: 'Fajr', time: prayerTimes.rawDates.fajr },
    { name: 'Sunrise', time: prayerTimes.rawDates.sunrise },
    { name: 'Dhuhr', time: prayerTimes.rawDates.dhuhr },
    { name: 'Asr', time: prayerTimes.rawDates.asr },
    { name: 'Maghrib', time: prayerTimes.rawDates.maghrib },
    { name: 'Isha', time: prayerTimes.rawDates.isha },
  ];

  let current = 'Isha';
  let next = times[0]; // Fajr next day by default

  for (let i = 0; i < times.length; i++) {
    if (now >= times[i].time) {
      current = times[i].name;
      if (i + 1 < times.length) {
        next = times[i + 1];
      } else {
        // Next is Fajr tomorrow
        const tomorrowFajr = new Date(prayerTimes.rawDates.fajr);
        tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
        next = { name: 'Fajr', time: tomorrowFajr };
      }
    }
  }

  // Calculate countdown to next prayer
  const diffMs = next.time.getTime() - now.getTime();
  const diffMins = Math.max(0, Math.floor(diffMs / (1000 * 60)));
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  return {
    currentPrayer: current,
    nextPrayer: next.name,
    nextPrayerTime: next.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    countdown: `${hours > 0 ? `${hours}h ` : ''}${minutes}m`,
    isImminent: diffMins <= 15,
  };
}
