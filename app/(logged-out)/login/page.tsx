"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Link from "next/link";

// We replace 'Form' components with 'Controller' and 'useForm' from react-hook-form

import { Controller, useForm } from "react-hook-form";

import { HeadsetIcon } from "lucide-react";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

// Import the new Field components

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

// --- 1. Zod Schema remains the same ---

const formSchema = z.object({
  email: z.email({
    message: "Invalid email address.", // Add a message for better UX
  }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    console.log("Login validation passed. Values:", values);

    // Add your login logic here
  };

  return (
    <>
      <HeadsetIcon size={44} className="text-blue-500" />

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">Login</CardTitle>

          <CardDescription>Login to your Supportly account</CardDescription>
        </CardHeader>

        <CardContent>
          {/* --- 2. Replace <Form> and <form> structure --- */}

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* --- 3. Email Field using Controller and Field components --- */}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                // The main Field component. We use data-invalid for styling errors.

                <Field data-invalid={fieldState.invalid ? "" : undefined}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    id={field.name} // Use field.name as the ID for accessibility
                    placeholder="john@doe.com"
                    type="email"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    {...field}
                  />

                  {/* Show error message if validation fails */}

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* --- 4. Password Field using Controller and Field components --- */}

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid ? "" : undefined}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="••••••••"
                    type="password"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    {...field}
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-between">
          <small>Don&apos;t have an account?</small>

          <Button asChild variant="outline" size="sm">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
