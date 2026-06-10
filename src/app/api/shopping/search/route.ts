import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ShoppingItemZodSchema } from "@model/ShoppingItem";
import { shoppingService } from "@service/services";

const ShoppingItemIdSchema = z.string().min(1, "Item ID is required");

export async function GET(request: NextRequest) {
  try {
    // const { searchParams } = new URL(request.url);
    // const query = searchParams.get("query")?.toLowerCase();

    const items = await shoppingService.getShoppingItems();

    // if (query) {
    //   const filteredItems = items.filter(
    //     (item) =>
    //       item.name.toLowerCase().includes(query) ||
    //       item.category.toLowerCase().includes(query)
    //   );
    //   return NextResponse.json(filteredItems, { status: 200 });
    // }

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
    const validatedData = ShoppingItemZodSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation Failed", issues: validatedData.error.message },
        { status: 400 }
      );
    }

    const newItem = await shoppingService.addShoppingItem(validatedData.data);
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
    const validatedId = ShoppingItemIdSchema.safeParse(body.id);
    if (!validatedId.success) {
      return NextResponse.json(
        { error: "Validation Failed", issues: { id: validatedId.error.message } },
        { status: 400 }
      );
    }
    const itemValidation = ShoppingItemZodSchema.safeParse(body);
    if (!itemValidation.success) {
      return NextResponse.json(
        { error: "Validation Failed", issues: itemValidation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const itemId = validatedId.data;
    const updatedItem = await shoppingService.setShoppingItem(itemId, itemValidation.data);
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

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedId = ShoppingItemIdSchema.safeParse(body.id);
    if (!validatedId.success) {
      return NextResponse.json(
        { error: "Validation Failed", issues: { id: validatedId.error.message } },
        { status: 400 }
      );
    }
    const itemId = validatedId.data;
    try {
      await shoppingService.removeShoppingItem(itemId);
      return NextResponse.json({ success: true, message: "Item deleted successfully" }, { status: 200 });
    } catch (serviceError: any) {
      if (serviceError.message === "Shopping item not found or already deleted") {
        return NextResponse.json({ error: serviceError.message }, { status: 404 });
      }
      throw serviceError;
    }
  } catch (error: any) {
    console.error("DELETE /api/shopping/search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
