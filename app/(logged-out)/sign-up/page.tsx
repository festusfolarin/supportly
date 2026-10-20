"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { CalendarIcon, HeadsetIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

function isAtLeast18(birth: Date) {
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 18;
}

// Lets the company checks run even when other fields (e.g. dob) are invalid
const isCompany = (payload: { value: unknown }) =>
  (payload.value as { accountType?: string } | undefined)?.accountType ===
  "company";

const formSchema = z
  .object({
    email: z.email({ message: "Invalid email address." }),
    accountType: z.enum(["personal", "company"], {
      error: "Select an account type",
    }),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number<string>().optional(),
    dob: z
      .date({ error: "Date of birth is required" })
      .refine(isAtLeast18, { message: "You must be at least 18 years old" }),
  })
  .refine((d) => d.accountType !== "company" || !!d.companyName?.trim(), {
    path: ["companyName"],
    message: "Company name is required",
    when: isCompany,
  })
  .refine(
    (d) => d.accountType !== "company" || (d.numberOfEmployees ?? 0) > 0,
    {
      path: ["numberOfEmployees"],
      message: "Number of employees is required",
      when: isCompany,
    },
  );

type SignupFormInput = z.input<typeof formSchema>;
type SignupFormValues = z.output<typeof formSchema>;

export default function SignupPage() {
  const [dobOpen, setDobOpen] = useState(false);

  const form = useForm<SignupFormInput, unknown, SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      accountType: "" as SignupFormInput["accountType"],
      companyName: "",
    },
  });

  const handleSubmit = (values: SignupFormValues) => {
    console.log("Signup validation passed. Values:", values);
  };

  const accountType = form.watch("accountType");

  return (
    <>
      <HeadsetIcon size={44} className="text-blue-500" />

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">Sign Up</CardTitle>
          <CardDescription>Create a new Supportly account</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit, (errors) =>
              console.log("Validation errors:", errors),
            )}
            className="space-y-4"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid ? "" : undefined}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="john@doe.com"
                    type="email"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="accountType"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid ? "" : undefined}>
                  <FieldLabel htmlFor={field.name}>Account Type</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    >
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {accountType === "company" && (
              <>
                <Controller
                  name="companyName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid ? "" : undefined}>
                      <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>
                      <Input
                        id={field.name}
                        placeholder="Company name"
                        type="text"
                        aria-invalid={fieldState.invalid ? "true" : "false"}
                        {...field}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="numberOfEmployees"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid ? "" : undefined}>
                      <FieldLabel htmlFor={field.name}>Employees</FieldLabel>
                      <Input
                        id={field.name}
                        placeholder="Number of Employees"
                        type="number"
                        min={0}
                        aria-invalid={fieldState.invalid ? "true" : "false"}
                        {...field}
                        value={field.value ?? ""}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </>
            )}

            <Controller
              name="dob"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid ? "" : undefined}>
                  <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>

                  <Popover open={dobOpen} onOpenChange={setDobOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id={field.name}
                        type="button"
                        variant="outline"
                        aria-invalid={fieldState.invalid}
                        className="flex justify-between font-normal"
                      >
                        {field.value ? (
                          <span>
                            {field.value.toLocaleDateString("en-GB", {
                              dateStyle: "long",
                            })}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            Pick a date
                          </span>
                        )}
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="center" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        defaultMonth={field.value ?? new Date(2000, 0)}
                        onSelect={(date) => {
                          field.onChange(date);
                          setDobOpen(false);
                        }}
                        captionLayout="dropdown"
                        startMonth={new Date(1930, 0)}
                        endMonth={new Date()}
                        fixedWeeks
                        weekStartsOn={1}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1930-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
