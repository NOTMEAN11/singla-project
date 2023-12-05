import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = {
  title: string;
  content: string;
  slug: string;
};

type Props = {
  Faq: Faq[];
};

function Accordions({ Faq }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {Faq.map((item, index) => (
        <AccordionItem value={item.slug} key={index}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Accordions;
