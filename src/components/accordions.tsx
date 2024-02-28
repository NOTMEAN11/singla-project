import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = {
  question: string;
  answer: string;
  id: string;
};

type Props = {
  Faq: Faq[];
};

function Accordions({ Faq }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {Faq.map((item, index) => (
        <AccordionItem value={item.id} key={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Accordions;
