"use client";
import { FAQsItems } from "@/constants/constants";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQs = () => {
  return (
    <section
      className="py-12 bg-slate-100 dark:bg-neutral-950 dark:text-white sm:py-16 lg:py-20 xl:py-24"
      id="FAQs"
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600 dark:text-white lg:text-lg lg:mt-6 lg:leading-8">
            Ask everything you need to know about our products and services.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 overflow-hidden border border-slate-700 dark:border-slate-800 divide-y divide-slate-700 dark:devide-slate-800 sm:mt-16 rounded-xl px-3">
          <Accordion type="single" collapsible>
            {FAQsItems.map((FAQsItem) => (
              <AccordionItem key={FAQsItem.id} value={FAQsItem.value}>
                <AccordionTrigger>{FAQsItem.question}</AccordionTrigger>
                <AccordionContent>{FAQsItem.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
