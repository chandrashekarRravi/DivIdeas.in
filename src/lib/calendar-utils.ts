/**
 * Calendar utility functions for real-time scheduling
 */

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  organizer?: string;
}

/**
 * Generate ICS (iCalendar) file content for calendar event
 */
export const generateICSFile = (event: CalendarEvent): string => {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeText = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DivIdeas//Meeting Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${Math.random().toString(36).substring(7)}@divideas.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.startTime)}`,
    `DTEND:${formatDate(event.endTime)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location)}`,
    `ORGANIZER;CN=${event.organizer || 'DivIdeas Team'}:MAILTO:rchandrashaker292004@gmail.com`,
    ...event.attendees.map(email => `ATTENDEE;CN=${email};RSVP=TRUE:MAILTO:${email}`),
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Meeting starting in 15 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
};

/**
 * Download ICS file
 */
export const downloadICSFile = (event: CalendarEvent, filename: string = 'meeting.ics'): void => {
  const icsContent = generateICSFile(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

/**
 * Generate Google Calendar URL with pre-filled event data
 */
export const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
  const formatGoogleDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatGoogleDate(event.startTime)}/${formatGoogleDate(event.endTime)}`,
    details: event.description,
    location: event.location,
    add: event.attendees.join(','),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Generate Microsoft Outlook Calendar URL
 */
export const generateOutlookCalendarUrl = (event: CalendarEvent): string => {
  const formatOutlookDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    subject: event.title,
    startdt: formatOutlookDate(event.startTime),
    enddt: formatOutlookDate(event.endTime),
    body: event.description,
    location: event.location,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

/**
 * Generate Yahoo Calendar URL
 */
export const generateYahooCalendarUrl = (event: CalendarEvent): string => {
  const formatYahooDate = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00Z`;
  };

  const params = new URLSearchParams({
    v: '60',
    view: 'd',
    type: '20',
    title: event.title,
    st: formatYahooDate(event.startTime),
    dur: String(Math.round((event.endTime.getTime() - event.startTime.getTime()) / 60000)),
    desc: event.description,
    in_loc: event.location,
  });

  return `https://calendar.yahoo.com/?${params.toString()}`;
};

/**
 * Generate a Google Meet link
 * Note: For production, you should use Google Calendar API to generate actual Meet links
 */
export const generateGoogleMeetLink = (): string => {
  // Fixed meeting link - replace with your actual meeting link
  // All meetings will use this same link: https://meet.google.com/rkd-adkh-rwi
  return 'https://meet.google.com/rkd-adkh-rwi';
  
  // Option: Generate unique meeting ID (uncomment to use dynamic links)
  // const chars = 'abcdefghijklmnopqrstuvwxyz';
  // const meetingId = Array.from({ length: 12 }, () => 
  //   chars[Math.floor(Math.random() * chars.length)]
  // ).join('');
  // return `https://meet.google.com/${meetingId}`;
};

/**
 * Parse time string (HH:MM) and combine with date
 */
export const combineDateAndTime = (date: Date, timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const combinedDate = new Date(date);
  combinedDate.setHours(hours, minutes, 0, 0);
  return combinedDate;
};

/**
 * Create calendar event from booking data
 */
export const createCalendarEvent = (
  date: Date,
  time: string,
  email: string,
  purpose: string,
  durationMinutes: number = 60
): CalendarEvent => {
  const startTime = combineDateAndTime(date, time);
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
  const meetLink = generateGoogleMeetLink();

  return {
    title: `Meeting with DivIdeas - ${purpose.substring(0, 50)}${purpose.length > 50 ? '...' : ''}`,
    description: `Purpose: ${purpose}\n\nGoogle Meet Link: ${meetLink}\n\nWe're looking forward to meeting with you!`,
    location: meetLink,
    startTime,
    endTime,
    attendees: [email, 'rchandrashaker292004@gmail.com'],
    organizer: 'DivIdeas Team',
  };
};

