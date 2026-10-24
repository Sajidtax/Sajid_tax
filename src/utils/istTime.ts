import { ISTStatus } from '../types';

/**
 * Calculates accurate office opening status based on Indian Standard Time (Asia/Kolkata).
 * Office Hours:
 * Monday – Saturday: 11:00 AM – 7:00 PM IST
 * Sunday: Closed
 */
export function getISTStatus(date: Date = new Date()): ISTStatus {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    let weekdayStr = '';
    let hour = 0;
    let minute = 0;

    for (const part of parts) {
      if (part.type === 'weekday') weekdayStr = part.value;
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'minute') minute = parseInt(part.value, 10);
    }

    const dayMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const day = dayMap[weekdayStr] ?? 0;
    const totalMinutes = hour * 60 + minute;
    const openMinutes = 11 * 60; // 11:00 AM = 660 mins
    const closeMinutes = 19 * 60; // 7:00 PM = 1140 mins

    const isWorkingDay = day >= 1 && day <= 6;
    const isOpen = isWorkingDay && totalMinutes >= openMinutes && totalMinutes < closeMinutes;

    // Display string formatted with 12-hour clock in IST
    const displayFormatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const formattedTimeIST = `${displayFormatter.format(date)} IST`;

    let statusText = 'Closed Now';
    let subText = 'Opens Mon–Sat at 11:00 AM IST';

    if (isOpen) {
      statusText = 'Open Now';
      const remainingMinutes = closeMinutes - totalMinutes;
      const remHours = Math.floor(remainingMinutes / 60);
      const remMins = remainingMinutes % 60;
      if (remHours > 0) {
        subText = `Closes at 7:00 PM IST (${remHours}h ${remMins}m remaining)`;
      } else {
        subText = `Closes at 7:00 PM IST (${remMins}m remaining)`;
      }
    } else if (day === 0) {
      // Sunday
      statusText = 'Closed Today (Sunday)';
      subText = 'Opens Monday at 11:00 AM IST';
    } else if (isWorkingDay && totalMinutes < openMinutes) {
      statusText = 'Closed Now';
      const waitMinutes = openMinutes - totalMinutes;
      const waitHours = Math.floor(waitMinutes / 60);
      const waitMins = waitMinutes % 60;
      subText = `Opens today at 11:00 AM IST (${waitHours > 0 ? `${waitHours}h ` : ''}${waitMins}m)`;
    } else if (day === 6 && totalMinutes >= closeMinutes) {
      // Saturday evening
      statusText = 'Closed for the Weekend';
      subText = 'Opens Monday at 11:00 AM IST';
    } else if (isWorkingDay && totalMinutes >= closeMinutes) {
      // Mon-Fri evening
      statusText = 'Closed for the Day';
      subText = 'Opens tomorrow at 11:00 AM IST';
    }

    return {
      isOpen,
      statusText,
      subText,
      formattedTimeIST,
      currentDayName: weekdayStr,
    };
  } catch (error) {
    // Graceful fallback
    return {
      isOpen: false,
      statusText: 'Office Hours: 11:00 AM – 7:00 PM IST',
      subText: 'Monday to Saturday (Sunday Closed)',
      formattedTimeIST: 'IST',
      currentDayName: 'Monday–Saturday',
    };
  }
}
