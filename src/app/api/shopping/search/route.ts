import { NextRequest, NextResponse } from "next/server";
import { ShoppingItem } from "@model/ShoppingItem";
import { shoppingService } from "@service/services";

export async function GET(request: NextRequest) {
  try {
    const items = await shoppingService.getShoppingItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/shopping/search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ShoppingItem.form(body);
    const newItem = await shoppingService.addShoppingItem(validatedData);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/shopping/search error:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "An item with this name already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ShoppingItem.parse(body);
    const itemId = validatedData.id;
    const updatedItem = await shoppingService.setShoppingItem(itemId, validatedData);
    if (!updatedItem) {
      return NextResponse.json({ error: "Shopping item not found" }, { status: 404 });
    }
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/shopping/search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
