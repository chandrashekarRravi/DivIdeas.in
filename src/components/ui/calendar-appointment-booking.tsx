'use client'

import { useState } from 'react'

import { CheckCircle2, ArrowLeft, Mail, Calendar as CalendarIcon, Clock, Download, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Calendar } from '@/components/ui/calendar'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { ScrollArea } from '@/components/ui/scroll-area'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { Textarea } from '@/components/ui/textarea'
import {
  createCalendarEvent,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  generateYahooCalendarUrl,
} from '@/lib/calendar-utils'

interface CalendarAppointmentBookingDemoProps {
  onSendMessage?: (data: { date: Date; time: string; email: string; purpose: string }) => void;
  onCalendarEventCreated?: (event: {
    googleCalendarUrl: string;
    outlookCalendarUrl: string;
    yahooCalendarUrl: string;
    meetLink: string;
  }) => void;
}

const CalendarAppointmentBookingDemo = ({ onSendMessage, onCalendarEventCreated }: CalendarAppointmentBookingDemoProps) => {

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState('')
  const [calendarLinks, setCalendarLinks] = useState<{
    googleCalendarUrl: string;
    outlookCalendarUrl: string;
    yahooCalendarUrl: string;
    meetLink: string;
  } | null>(null)

  const timeSlots = Array.from({ length: 37 }, (_, i) => {

    const totalMinutes = i * 15

    const hour = Math.floor(totalMinutes / 60) + 9

    const minute = totalMinutes % 60

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

  })

  // Get current date for dynamic booking
  const today = new Date();
  const bookedDates = Array.from({ length: 3 }, (_, i) => {
    const bookedDate = new Date(today);
    bookedDate.setDate(today.getDate() + i + 2); // Book dates 2, 3, 4 days from today
    return bookedDate;
  });

  // Step 1: Date and Time Selection
  if (step === 1) {
    return (
    <div>
      <Card className='gap-0 p-0 border-0 shadow-none'>

        <CardHeader className='flex h-max justify-center border-b !p-6 pb-4'>

          <CardTitle className='text-xl'>Book your appointment</CardTitle>

        </CardHeader>

        <CardContent className='relative p-0 md:pr-48 bg-background'>

          <div className='p-6'>

            <Calendar

              mode='single'

              selected={date}

              onSelect={setDate}

              defaultMonth={date}

              disabled={bookedDates}

              showOutsideDays={false}

              modifiers={{

                booked: bookedDates

              }}

              modifiersClassNames={{

                booked: '[&>button]:line-through opacity-100'

              }}

              className='bg-transparent p-0 [--cell-size:--spacing(10)]'

              formatters={{

                formatWeekdayName: date => {

                  return date.toLocaleString('en-US', { weekday: 'short' })

                }

              }}

            />

          </div>

          <div className='inset-y-0 right-0 flex w-full flex-col gap-4 border-t max-md:h-60 md:absolute md:w-48 md:border-t-0 md:border-l'>

            <ScrollArea className='h-full'>

              <div className='flex flex-col gap-2 p-6'>

                {timeSlots.map(time => (

                  <Button

                    key={time}

                    variant={selectedTime === time ? 'default' : 'outline'}

                    onClick={() => setSelectedTime(time)}

                    className='w-full shadow-none'

                  >

                    {time}

                  </Button>

                ))}

              </div>

            </ScrollArea>

          </div>

        </CardContent>

        <CardFooter className='flex flex-col gap-4 border-t px-6 !py-5 md:flex-row'>

          <div className='flex items-center gap-2 text-sm'>

            {date && selectedTime ? (

              <>

                <CheckCircle2 className='size-5 text-green-600 dark:text-green-400' />

                <span>

                  Your meeting is scheduled for{' '}

                  <span className='font-medium'>

                    {date?.toLocaleDateString('en-US', {

                      weekday: 'long',

                      day: 'numeric',

                      month: 'long'

                    })}{' '}

                  </span>

                  at <span className='font-medium'>{selectedTime}</span>.

                </span>

              </>

            ) : (

              <>Select a date and time for your meeting.</>

            )}

          </div>

          <Button 
            disabled={!date || !selectedTime} 
            className='w-full md:ml-auto md:w-auto' 
            onClick={() => {
              if (date && selectedTime) {
                setStep(2);
              }
            }}
          >

            Continue

          </Button>

        </CardFooter>

      </Card>
    </div>
    );
  }

  // Step 2: Contact Information Form
  if (step === 2) {
    const formattedDate = date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (date && selectedTime && email && purpose && onSendMessage) {
        // Create calendar event
        const calendarEvent = createCalendarEvent(date, selectedTime, email, purpose, 60);
        
        // Generate calendar links
        const googleCalendarUrl = generateGoogleCalendarUrl(calendarEvent);
        const outlookCalendarUrl = generateOutlookCalendarUrl(calendarEvent);
        const yahooCalendarUrl = generateYahooCalendarUrl(calendarEvent);
        
        // Store calendar links (don't download ICS file - it will be in email)
        const links = {
          googleCalendarUrl,
          outlookCalendarUrl,
          yahooCalendarUrl,
          meetLink: calendarEvent.location,
        };
        setCalendarLinks(links);
        
        // Notify parent component about calendar event
        if (onCalendarEventCreated) {
          onCalendarEventCreated(links);
        }
        
        // Call the original handler
        onSendMessage({
          date,
          time: selectedTime,
          email,
          purpose
        });
        
        // Move to success step after a short delay
        setTimeout(() => {
          setStep(3);
        }, 500);
      }
    };

    return (
      <div>
        <Card className='gap-0 p-0 border-0 shadow-none'>
          <CardHeader className='flex h-max justify-center border-b !p-6 pb-4'>
            <div className='flex items-center justify-between w-full relative'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setStep(1)}
                className='absolute left-0'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <CardTitle className='text-xl text-center flex-1'>Contact Information</CardTitle>
              <div className='w-10' /> {/* Spacer for centering */}
            </div>
          </CardHeader>

          <CardContent className='p-6 bg-background'>
            {/* Selected Date/Time Summary */}
            <div className='mb-6 p-4 bg-muted/50 rounded-lg space-y-2'>
              <div className='flex items-center gap-2 text-sm'>
                <CalendarIcon className='h-4 w-4 text-muted-foreground' />
                <span className='font-medium'>Selected Date:</span>
                <span>{formattedDate}</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <Clock className='h-4 w-4 text-muted-foreground' />
                <span className='font-medium'>Selected Time:</span>
                <span>{selectedTime}</span>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Your Email Address *</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your.email@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='w-full'
                />
                <p className='text-xs text-muted-foreground'>
                  We'll send the meeting details to this email
                </p>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='purpose'>Purpose of Meeting *</Label>
                <Textarea
                  id='purpose'
                  placeholder='Please describe the purpose of the meeting...'
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                  rows={4}
                  className='w-full resize-none'
                />
                <p className='text-xs text-muted-foreground'>
                  Brief description of what you'd like to discuss
                </p>
              </div>

              <CardFooter className='flex flex-col gap-4 border-t px-0 !pt-6 mt-6 md:flex-row'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setStep(1)}
                  className='w-full md:w-auto'
                >
                  Back
                </Button>
                <Button
                  type='submit'
                  disabled={!email || !purpose}
                  className='w-full md:ml-auto md:w-auto'
                >
                  <Mail className='mr-2 h-4 w-4' />
                  Send Message
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 3: Success with Calendar Links
  if (step === 3 && calendarLinks) {
    return (
      <div>
        <Card className='gap-0 p-0 border-0 shadow-none'>
          <CardHeader className='flex h-max justify-center border-b !p-6 pb-4'>
            <CardTitle className='text-xl text-center'>Meeting Scheduled Successfully!</CardTitle>
          </CardHeader>

          <CardContent className='p-6 bg-background'>
            <div className='text-center mb-6'>
              <CheckCircle2 className='h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4' />
              <p className='text-muted-foreground mb-2'>
                Your calendar invite has been downloaded. Add it to your preferred calendar:
              </p>
            </div>

            <div className='space-y-3 mb-6'>
              <Button
                variant='outline'
                className='w-full justify-start'
                onClick={() => window.open(calendarLinks.googleCalendarUrl, '_blank')}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                Add to Google Calendar
                <ExternalLink className='ml-auto h-4 w-4' />
              </Button>
              
              <Button
                variant='outline'
                className='w-full justify-start'
                onClick={() => window.open(calendarLinks.outlookCalendarUrl, '_blank')}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                Add to Outlook Calendar
                <ExternalLink className='ml-auto h-4 w-4' />
              </Button>
              
              <Button
                variant='outline'
                className='w-full justify-start'
                onClick={() => window.open(calendarLinks.yahooCalendarUrl, '_blank')}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                Add to Yahoo Calendar
                <ExternalLink className='ml-auto h-4 w-4' />
              </Button>
            </div>

            <div className='p-4 bg-muted/50 rounded-lg mb-6'>
              <p className='text-sm font-medium mb-2'>Google Meet Link:</p>
              <div className='flex items-center gap-2'>
                <code className='flex-1 text-xs bg-background p-2 rounded border break-all'>
                  {calendarLinks.meetLink}
                </code>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    navigator.clipboard.writeText(calendarLinks.meetLink);
                    // You could add a toast here
                  }}
                >
                  <Download className='h-4 w-4' />
                </Button>
              </div>
            </div>

            <CardFooter className='flex flex-col gap-2 px-0 !pt-0'>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => {
                  setStep(1);
                  setEmail('');
                  setPurpose('');
                  setSelectedTime(null);
                  setCalendarLinks(null);
                }}
              >
                Schedule Another Meeting
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

export default CalendarAppointmentBookingDemo

