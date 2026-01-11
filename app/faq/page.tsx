"use client"

import Link from "next/link"
import { Metadata } from "next"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"

// UI Components
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Icons
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2
} from "lucide-react"

const faqData = [
  {
    id: "1",
    question: "What types of properties do you offer?",
    answer: "We provide a wide range of options including residential plots, commercial plots, farmhouses, and ready-to-move properties, giving buyers flexibility based on their needs."
  },
  {
    id: "2", 
    question: "Are the properties legally verified?",
    answer: "Yes. Every property we list is checked for clear title, proper approvals, and compliance with local regulations to ensure complete peace of mind for buyers."
  },
  {
    id: "3",
    question: "Do you offer both residential and commercial plots?",
    answer: "Yes. Whether you are looking to build a home or invest in a commercial venture, we provide plots suitable for both purposes."
  },
  {
    id: "4",
    question: "What makes investing in your properties a good choice?",
    answer: "Our properties are carefully selected for long-term growth, affordability, and strong investment potential. We focus on transparency and customer satisfaction throughout the buying process."
  },
  {
    id: "5",
    question: "Can I visit the property before making a decision?",
    answer: "Absolutely. We encourage site visits so you can personally inspect the land, surroundings, and infrastructure before finalizing your purchase."
  },
  {
    id: "6",
    question: "What facilities and infrastructure are available with your plots?",
    answer: "Plots come with essential infrastructure like road access, electricity, and water availability. Project-specific amenities may vary, but we ensure basic infrastructure is in place."
  },
  {
    id: "7",
    question: "How does the payment process work?",
    answer: "We offer flexible payment options. Buyers can pay in full or choose installment plans depending on the property and their financial preferences."
  },
  {
    id: "8",
    question: "Do you assist with registration and legal paperwork?",
    answer: "Yes. Our team guides you through the entire registration process, including documentation, agreements, and title transfers."
  },
  {
    id: "9",
    question: "Are there any hidden charges?",
    answer: "No. We maintain transparency in pricing. All costs are clearly communicated upfront, including government charges like registration and stamp duty."
  },
  {
    id: "10",
    question: "Can NRIs purchase property through your platform?",
    answer: "Yes. We assist Non-Resident Indians with all required documentation and provide end-to-end support, making the process simple and reliable."
  },
  {
    id: "11",
    question: "How long does it take to get ownership after purchase?",
    answer: "The timeline depends on the property type and paperwork, but since we only list verified properties, the process is usually quick and smooth."
  },
  {
    id: "12",
    question: "Do you provide loan or financing support?",
    answer: "Yes. We can connect buyers with trusted banks and financial institutions to help secure home loans or property financing."
  },
  {
    id: "13",
    question: "What are the tax or legal obligations of buying property?",
    answer: "Buyers are responsible for applicable government charges such as registration fees, stamp duty, and property taxes. We guide you on all these aspects in advance."
  },
  {
    id: "14",
    question: "Do you assist after the purchase is completed?",
    answer: "Yes. We continue to support clients with resale guidance, rental assistance, and property management if required."
  },
  {
    id: "15",
    question: "How do I get started if I want to buy a property?",
    answer: "Simply reach out to our team through the website or phone. We'll help shortlist options, arrange site visits, explain pricing, and guide you through the complete buying process."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
             <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="font-extrabold text-5xl md:text-6xl mb-6 tracking-tight text-foreground">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Questions</span>
          </h1>
          
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to common questions about investing in Uttarakhand properties. 
            Get clarity on our processes, legal requirements, and support services.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
               "15+ Common Questions",
               "Detailed Answers",
               "Expert Guidance"
            ].map((tag, i) => (
               <Badge key={i} variant="outline" className="px-4 py-1.5 text-sm border-secondary/40 bg-secondary/5 text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-secondary" /> {tag}
               </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ CONTENT --- */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-border bg-card">
              <CardHeader className="text-center pb-8 border-b border-border/50">
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Everything You Need to Know
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Comprehensive answers to help you make informed property decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqData.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="border border-border rounded-lg px-6 bg-background/50 data-[state=open]:bg-primary/5 data-[state=open]:border-primary/20 transition-all duration-200"
                    >
                      <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-base">
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

      {/* --- CONTACT CTA --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-bold text-4xl mb-6 text-foreground">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">
            Our expert team is here to help. Get personalized answers to your specific questions about Uttarakhand property investment.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base shadow-lg hover:shadow-primary/25 transition-all"
              asChild
            >
              <a href="tel:+917870231314">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/5 px-8 h-12 text-base"
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Send Message
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-muted-foreground hover:text-primary px-8 h-12 text-base"
              asChild
            >
              <Link href="/chatbot">
                <MessageCircle className="mr-2 h-5 w-5" />
                Try Chatbot <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}