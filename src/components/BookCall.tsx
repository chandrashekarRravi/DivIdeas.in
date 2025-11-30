import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CalendarAppointmentBookingDemo from "@/components/ui/calendar-appointment-booking";
import { useToast } from "@/hooks/use-toast";
import {
  createCalendarEvent,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  generateYahooCalendarUrl,
  generateICSFile,
} from "@/lib/calendar-utils";
import { sendEmail, sendEmailToOwner } from "@/lib/email-service";

const BookCall = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [calendarLinks, setCalendarLinks] = useState<{
    googleCalendarUrl: string;
    outlookCalendarUrl: string;
    yahooCalendarUrl: string;
    meetLink: string;
  } | null>(null);
  const { toast } = useToast();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (data: { date: Date; time: string; email: string; purpose: string }) => {
    const { date, time, email, purpose } = data;
    
    try {
      // Create calendar event
      const calendarEvent = createCalendarEvent(date, time, email, purpose, 60);
      const meetLink = calendarEvent.location;

      // Format date for display
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Generate ICS file content (to include in email body)
      const icsContent = generateICSFile(calendarEvent);

      // Create email content for site owner
      const ownerEmailSubject = `Meeting Request from ${email} - ${formattedDate} at ${time}`;
      const ownerEmailBody = 
        `Hello,\n\n` +
        `You have received a new meeting request:\n\n` +
        `From: ${email}\n` +
        `Date: ${formattedDate}\n` +
        `Time: ${time}\n\n` +
        `Purpose of Meeting:\n${purpose}\n\n` +
        `Google Meet Link: ${meetLink}\n\n` +
        `Please confirm or suggest an alternative time if needed.\n\n` +
        `Best regards`;

      // Create email content for user - includes ICS file content
      const userEmailSubject = `Meeting Confirmation - ${formattedDate} at ${time}`;
      const userEmailBody = 
        `Hello,\n\n` +
        `Thank you for scheduling a meeting with us!\n\n` +
        `Meeting Details:\n` +
        `Date: ${formattedDate}\n` +
        `Time: ${time}\n\n` +
        `Purpose: ${purpose}\n\n` +
        `Google Meet Link: ${meetLink}\n\n` +
        `Calendar Invite (ICS file):\n` +
        `Please copy the content below and save it as a .ics file to add to your calendar:\n\n` +
        `---BEGIN ICS FILE---\n` +
        `${icsContent}\n` +
        `---END ICS FILE---\n\n` +
        `Instructions:\n` +
        `1. Copy everything between "---BEGIN ICS FILE---" and "---END ICS FILE---"\n` +
        `2. Paste it into a text file\n` +
        `3. Save it with a .ics extension (e.g., meeting.ics)\n` +
        `4. Double-click the file to add it to your calendar\n\n` +
        `We're looking forward to meeting with you!\n\n` +
        `Best regards,\n` +
        `DivIdeas Team`;

      // Send emails automatically using EmailJS
      const emailParams = {
        toEmail: email,
        subject: userEmailSubject,
        body: userEmailBody,
        meetingDate: formattedDate,
        meetingTime: time,
        purpose: purpose,
        meetLink: meetLink,
        icsContent: icsContent,
      };

      const ownerEmailParams = {
        toEmail: 'rchandrashaker292004@gmail.com',
        subject: ownerEmailSubject,
        body: ownerEmailBody,
        meetingDate: formattedDate,
        meetingTime: time,
        purpose: purpose,
        meetLink: meetLink,
      };

      // Show loading toast
      toast({
        title: "Sending emails...",
        description: "Please wait while we send the meeting confirmation emails.",
      });

      // Log for debugging
      console.log('📧 Attempting to send emails:', {
        to: email,
        owner: 'rchandrashaker292004@gmail.com',
      });

      // Send both emails
      const [userEmailSent, ownerEmailSent] = await Promise.all([
        sendEmail(emailParams),
        sendEmailToOwner(ownerEmailParams),
      ]);

      console.log('📧 Email send results:', {
        userEmailSent,
        ownerEmailSent,
      });

      if (userEmailSent && ownerEmailSent) {
        toast({
          title: "Emails sent successfully!",
          description: `Meeting confirmation has been sent to ${email} and rchandrashaker292004@gmail.com`,
        });
      } else if (userEmailSent) {
        toast({
          title: "Partially sent",
          description: `Email sent to ${email}, but failed to send to owner. Please check EmailJS configuration.`,
          variant: "destructive",
        });
      } else if (ownerEmailSent) {
        toast({
          title: "Partially sent",
          description: `Email sent to owner, but failed to send to ${email}. Please check EmailJS configuration.`,
          variant: "destructive",
        });
      } else {
        // Fallback to mailto if EmailJS is not configured
        const userMailtoLink = `mailto:${email}?cc=rchandrashaker292004@gmail.com&subject=${encodeURIComponent(userEmailSubject)}&body=${encodeURIComponent(userEmailBody)}`;
        window.location.href = userMailtoLink;
        
        toast({
          title: "EmailJS not configured",
          description: "Please configure EmailJS to send emails automatically. Opening email client as fallback.",
          variant: "destructive",
        });
      }

      // Generate calendar links
      const googleCalendarUrl = generateGoogleCalendarUrl(calendarEvent);
      const outlookCalendarUrl = generateOutlookCalendarUrl(calendarEvent);
      const yahooCalendarUrl = generateYahooCalendarUrl(calendarEvent);

      // Store calendar links in sessionStorage for access
      sessionStorage.setItem('calendarLinks', JSON.stringify({
        google: googleCalendarUrl,
        outlook: outlookCalendarUrl,
        yahoo: yahooCalendarUrl,
        meetLink: meetLink,
        date: formattedDate,
        time: time
      }));

      // Close dialog after a short delay
      setTimeout(() => {
        setIsDialogOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      toast({
        title: "Error",
        description: "There was an error scheduling the meeting. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <section id="book-call" className="bg-gradient-to-b from-background to-primary/5 py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-semibold text-foreground">
              Start Building
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to transform your ideas into reality? Let's create something amazing together.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="hover-scale shadow-elegant"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setIsDialogOpen(true)}
                className="hover-scale"
              >
                Book Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          <div className="p-6 pb-4">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl">Schedule Your Meeting</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Select a date and time for your appointment. Complete the form to send meeting details to both parties.
              </DialogDescription>
            </DialogHeader>
            <CalendarAppointmentBookingDemo 
              onSendMessage={handleSendMessage}
              onCalendarEventCreated={(links) => {
                setCalendarLinks(links);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookCall;
