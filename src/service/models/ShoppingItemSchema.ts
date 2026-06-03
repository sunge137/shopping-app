import { ShoppingItem, ShoppingStatus } from "@service/entities/ShoppingItem";
import { ProjectionType, Schema, model, models } from "mongoose";

const ShoppingItemSchema = new Schema<ShoppingItem>({
  name: { type: String, required: true, unique: true },
  category: { type: String },
  status: { type: String, enum: Object.values(ShoppingStatus), required: true },
  quantity: { type: Number, required: true, },
  unit: { type: String, required: true },
  price: { type: Number, required: true },
  tags: { type: [String] },
});

const ShoppingItemModel = models.ShoppingItem || model<ShoppingItem>("ShoppingItem", ShoppingItemSchema);

export const ShoppingItemProjection: ProjectionType<ShoppingItem> = {
  name: 1,
  category: 1,
  status: 1,
  quantity: 1,
  unit: 1,
  price: 1,
  tags: 1,
  _id: 0
};

export default ShoppingItemModel;
