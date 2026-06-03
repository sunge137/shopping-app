import type { Metadata } from "next";
import ShoppingFooter from "@components/ShoppingFooter";

export const metadata: Metadata = {
  title: "Shopping List",
  description: "Next.js Shopping List App",
};

export default function ShoppingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ShoppingFooter />
    </>
  );
}
