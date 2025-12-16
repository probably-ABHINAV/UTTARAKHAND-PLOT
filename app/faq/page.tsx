import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/footer";
import { Metadata } from "next";
import FAQClientActions from "@/components/FAQClientActions"; // adjust path if you saved elsewhere

export const metadata: Metadata = {
  title: "FAQ - Property in Uttarakhand | Frequently Asked Questions",
  description:
    "Find answers to common questions about investing in Uttarakhand properties. Get clarity on our processes, legal requirements, and support services.",
  keywords: "Uttarakhand property FAQ, real estate questions, property investment guide, legal property queries",
};

const faqData = [
  { id: "1", question: "What types of properties do you offer?", answer: "We provide a wide range of options including residential plots, commercial plots, farmhouses, and ready-to-move properties, giving buyers flexibility based on their needs." },
  { id: "2", question: "Are the properties legally verified?", answer: "Yes. Every property we list is checked for clear title, proper approvals, and compliance with local regulations to ensure complete peace of mind for buyers." },
  { id: "3", question: "Do you offer both residential and commercial plots?", answer: "Yes. Whether you are looking to build a home or invest in a commercial venture, we provide plots suitable for both purposes." },
  { id: "4", question: "What makes investing in your properties a good choice?", answer: "Our properties are carefully selected for long-term growth, affordability, and strong investment potential. We focus on transparency and customer satisfaction throughout the buying process." },
  { id: "5", question: "Can I visit the property before making a decision?", answer: "Absolutely. We encourage site visits so you can personally inspect the land, surroundings, and infrastructure before finalizing your purchase." },
  { id: "6", question: "What facilities and infrastructure are available with your plots?", answer: "Plots come with essential infrastructure like road access, electricity, and water availability. Project-specific amenities may vary, but we ensure basic infrastructure is in place." },
  { id: "7", question: "How does the payment process work?", answer: "We offer flexible payment options. Buyers can pay in full or choose installment plans depending on the property and their financial preferences." },
  { id: "8", question: "Do you assist with registration and legal paperwork?", answer: "Yes. Our team guides you through the entire registration process, including documentation, agreements, and title transfers." },
  { id: "9", question: "Are there any hidden charges?", answer: "No. We maintain transparency in pricing. All costs are clearly communicated upfront, including government charges like registration and stamp duty." },
  { id: "10", question: "Can NRIs purchase property through your platform?", answer: "Yes. We assist Non-Resident Indians with all required documentation and provide end-to-end support, making the process simple and reliable." },
  { id: "11", question: "How long does it take to get ownership after purchase?", answer: "The timeline depends on the property type and paperwork, but since we only list verified properties, the process is usually quick and smooth." },
  { id: "12", question: "Do you provide loan or financing support?", answer: "Yes. We can connect buyers with trusted banks and financial institutions to help secure home loans or property financing." },
  { id: "13", question: "What are the tax or legal obligations of buying property?", answer: "Buyers are responsible for applicable government charges such as registration fees, stamp duty, and property taxes. We guide you on all these aspects in advance." },
  { id: "14", question: "Do you assist after the purchase is completed?", answer: "Yes. We continue to support clients with resale guidance, rental assistance, and property management if required." },
  { id: "15", question: "How do I get started if I want to buy a property?", answer: "Simply reach out to our team through the website or phone. We'll help shortlist options, arrange site visits, explain pricing, and guide you through the complete buying process." }
];

export default function FAQPage() {
  const primary = "var(--primary, #FF7A00)";
  const secondary = "var(--secondary, #C6EC2A)";

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background, #fff)" }}>
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24" style={{ background: "linear-gradient(180deg, rgba(255,122,0,0.06), rgba(198,236,42,0.03))" }}>
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="mx-auto h-16 w-16 mb-6" style={{ color: primary }} />
          <h1 className="font-bold text-5xl md:text-6xl mb-6" style={{ color: secondary }}>
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed mb-8" style={{ color: "var(--muted-foreground, #7a5a2a)" }}>
            Find answers to common questions about investing in Uttarakhand properties. Get clarity on our processes, legal requirements, and support services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge style={{ background: primary, color: "#fff" }} className="px-4 py-2 text-sm">15+ Common Questions</Badge>
            <Badge style={{ background: primary, color: "#fff" }} className="px-4 py-2 text-sm">Detailed Answers</Badge>
            <Badge style={{ background: secondary, color: "#000" }} className="px-4 py-2 text-sm">Expert Guidance</Badge>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[var(--color-card,#fff)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0" style={{ background: "linear-gradient(180deg,#ffffff 0%, rgba(255,255,255,0.95) 60%)" }}>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                  Everything You Need to Know
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Comprehensive answers to help you make informed property decisions
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqData.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border border-gray-200 rounded-lg px-6 py-2 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-[#FF6B35] transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed pt-4 pb-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section (client actions below) */}
      <section className="py-16" style={{ background: "linear-gradient(180deg, rgba(255,122,0,0.04), rgba(198,236,42,0.02))" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-bold text-3xl mb-6 text-gray-800">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Our expert team is here to help. Get personalized answers to your specific questions about Uttarakhand property investment.
          </p>

          {/* client-side CTA buttons (component contains handlers) */}
          <FAQClientActions />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
