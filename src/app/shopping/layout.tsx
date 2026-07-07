import type { Metadata } from "next";
import ShoppingFooter from "@components/ShoppingFooter";
import { ShoppingItemData } from "@model/ShoppingItem";
import ShoppingProvider from "@providers/ShoppingProvider";
import { getShoppingItems } from "@utilities/api";

export const metadata: Metadata = {
  title: "Shopping List",
  description: "Next.js Shopping List App",
};

export default async function ShoppingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items: ShoppingItemData[] = await getShoppingItems();
  return (
    <>
      <ShoppingProvider initialList={items}>
        {children}
        <ShoppingFooter />
      </ShoppingProvider>
    </>
  );
}
