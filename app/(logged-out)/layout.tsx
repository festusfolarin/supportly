import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

type Props = {
  children?: React.ReactNode;
};

export default function LoggedOutLayout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen justify-center items-center p-10">
        {children}
      </div>
      <LightDarkToggle className="fixed bottom-4 right-4" />
    </>
  );
}
