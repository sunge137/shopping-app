import { NextRequest, NextResponse } from "next/server";
import ShoppingItemModel, { ShoppingItemProjection } from "@service/models/ShoppingItemSchema";
import dbConnect from "@service/mongodb";
import { ShoppingItem, ShoppingItemSchema, ShoppingStatus } from "@service/entities/ShoppingItem";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const allShoppingItems: ShoppingItem[] = await ShoppingItemModel.find({}, ShoppingItemProjection);
    const response = NextResponse.json(
      { message: "Get sent successfully", id: Date.now(), data: allShoppingItems },
      { status: 201 }
    );
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const parsedData = ShoppingItemSchema.parse(body);
    const parsedItem = new ShoppingItem(parsedData);
    const { name } = parsedItem;
    const newShoppingItem = await ShoppingItemModel.create(parsedItem);
    const response = NextResponse.json(
      { message: "Post created successfully", name, id: Date.now(), data: { item: newShoppingItem } },
      { status: 201 }
    );
    return response;
  } catch (error) {
    console.error(error);
    let errMsg = "Failed to process request";
    let statusCode = 400;
    if (error instanceof mongoose.mongo.MongoServerError) {
      errMsg = "Database Conflict";
      statusCode = 409;
    }
    return NextResponse.json(
      { error: errMsg },
      { status: statusCode }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const parsedData = ShoppingItemSchema.parse(body);
    const parsedItem = new ShoppingItem(parsedData);
    const { name } = parsedItem;
    const newShoppingItem = await ShoppingItemModel.findOneAndUpdate({ name: name }, parsedItem);
    const response = NextResponse.json(
      { message: "Put updated successfully", name, id: Date.now(), data: { item: newShoppingItem } },
      { status: 201 }
    );
    return response;
  } catch (error) {
    console.error(error);
    let errMsg = "Failed to process request";
    let statusCode = 400;
    if (error instanceof mongoose.mongo.MongoServerError) {
      errMsg = "Database Conflict";
      statusCode = 409;
    }
    return NextResponse.json(
      { error: errMsg },
      { status: statusCode }
    );
  }
}