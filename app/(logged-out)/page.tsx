import { Button } from "@/components/ui/button";
import { HeadsetIcon } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <HeadsetIcon size={44} className="text-blue-500" />
      <h1>Supportly</h1>
      <p className="mb-2">Better customer support starts here</p>
      <div className="flex gap-2 items-center">
        <Button asChild className="w-28">
          <Link href="/login">Log in</Link>
        </Button>
        <small className="text-muted-foreground">|</small>
        <Button variant={"outline"} className="w-28" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </>
  );
}
