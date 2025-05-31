/* eslint-disable @next/next/no-img-element */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
  buyAmount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Please enter a valid positive number",
  }),
  takeProfit1: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Please enter a valid positive number",
  }),
  takeProfit2: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Please enter a valid positive number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const Frame = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyAmount: "",
      takeProfit1: "",
      takeProfit2: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  // Define form field data for mapping
  const formFields = [
    {
      id: "buyAmount",
      label: "BUY AMOUNT",
      placeholder: "EG. 0.222233",
      currency: "SOL",
    },
    {
      id: "takeProfit1",
      label: "TAKE PROFIT",
      placeholder: "EG. 0.222233",
      currency: "SOL",
    },
    {
      id: "takeProfit2",
      label: "TAKE PROFIT",
      placeholder: "EG. 0.222233",
      currency: "SOL",
    },
  ];

  return (
    <Card className="inline-flex flex-col h-[595px] w-[415px] px-12 py-[38px] bg-[#020c12] rounded-2xl overflow-hidden border border-transparent">
      <CardContent className="flex flex-col h-full p-0 justify-between">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="flex flex-col gap-[26px]">
            {/* Header */}
            <div className="flex items-center gap-[26px] w-full">
              <div className="w-12 h-12 bg-[#0a141a] rounded-[5px] overflow-hidden border border-solid border-[#0f1b22] flex items-center justify-center">
                <img
                  className="w-[29px] h-[29px]"
                  alt="Back button"
                  src="/group.png"
                />
              </div>
              <h2 className="font-['Space_Grotesk',Helvetica] font-normal text-white text-[19.9px]">
                ADD AUTO BUY
              </h2>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-[27px] w-full">
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col w-full gap-3">
                  <label className="font-['Space_Grotesk',Helvetica] font-normal text-white text-sm">
                    {field.label}
                  </label>
                  <div className="flex h-[52px] items-center bg-[#0a141a] rounded-[7px] px-6 py-[18.04px]">
                    <Input
                      {...form.register(field.id as "buyAmount" | "takeProfit1" | "takeProfit2")}
                      className="border-none bg-transparent text-[#7a7a7a] text-sm font-['Space_Grotesk',Helvetica] placeholder:text-[#7a7a7a] h-full p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder={field.placeholder}
                    />
                    <div className="flex items-center">
                      <img
                        className="w-px h-[27px]"
                        alt="Line"
                        src="/line-9.svg"
                      />
                      <span className="ml-2 font-['Space_Grotesk',Helvetica] font-normal text-[#7a7a7a] text-sm">
                        {field.currency}
                      </span>
                    </div>
                  </div>
                  {form.formState.errors[field.id as keyof FormValues] && (
                    <span className="text-[#ff4c02] text-sm">
                      {form.formState.errors[field.id as keyof FormValues]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="top-[-336px] left-[203px] absolute w-[546px] h-[546px] rounded-[273px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.13]" />
          <div className="top-[-90px] left-[-444px] absolute w-[546px] h-[546px] rounded-[273px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.13]" />

          {/* Divider */}
          <Separator className="bg-transparent my-4">
            <img className="w-full h-px" alt="Line" src="/line-8.svg" />
          </Separator>

          {/* Action Buttons */}
          <div className="flex w-full items-end justify-end gap-[11px]">
            <Button
              type="submit"
              className="flex h-[61px] items-center justify-center gap-[5.31px] px-[8.85px] py-[10.62px] flex-1 bg-[#ff4c02] rounded-[9.73px] hover:bg-[#ff4c02]/90"
            >
              <div className="bg-[url(/group-1.png)] w-6 h-6 bg-[100%_100%]" />
              <span className="font-['Space_Grotesk',Helvetica] font-normal text-white text-[15px]">
                CONFIRM TARGET
              </span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="flex h-[61px] items-center justify-center gap-[5.31px] px-[8.85px] py-[10.62px] flex-1 bg-[#ededed08] rounded-[9.73px] border-[0.88px] border-solid border-[#ffffff40] hover:bg-[#ededed15]"
            >
              <div className="bg-[url(/group-2.png)] w-6 h-6 bg-[100%_100%]" />
              <span className="font-['Space_Grotesk',Helvetica] font-normal text-white text-[15px]">
                CANCEL
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};