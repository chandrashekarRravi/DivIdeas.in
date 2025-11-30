import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js), along with modern tools like Tailwind CSS, TypeScript, and various APIs. We stay updated with the latest technologies to deliver cutting-edge solutions.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and requirements. A simple landing page might take 1-2 weeks, while a full-stack application could take 4-8 weeks. We provide detailed timelines during the planning phase.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes! We provide ongoing support and maintenance packages to ensure your application runs smoothly. This includes bug fixes, updates, and feature enhancements as needed.",
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing starts from ₹2,999 and varies based on project scope, complexity, and timeline. We provide transparent quotes after understanding your requirements during the initial consultation.",
  },
  {
    question: "Can you work with existing projects?",
    answer: "Absolutely! We can help with bug fixes, feature additions, UI/UX improvements, performance optimization, and complete refactoring of existing applications.",
  },
  {
    question: "How do you ensure code quality?",
    answer: "We follow industry best practices including code reviews, thorough testing, clean code principles, and version control with Git. All deliverables are well-documented and maintainable.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about working with DivIdeas
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-background border border-border rounded-lg px-6 hover:shadow-elegant transition-all duration-300 cursor-target"
            >
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
