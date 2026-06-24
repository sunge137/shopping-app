import { ShoppingItem, ShoppingItemFormData } from "@model/ShoppingItem";
import { ShoppingStatus } from "@model/ShoppingStatus";
import { Document, model, models, Schema } from "mongoose";
import { IShoppingRepository } from "./ShoppingRepository";
import { dbConnect } from "./mongodb";

interface IMongoDBShoppingItemDocument extends Document, ShoppingItemFormData {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
}

const MongoDBShoppingItemSchema = new Schema<IMongoDBShoppingItemDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    category: { type: String, default: "", trim: true },
    status: { type: String, enum: Object.values(ShoppingStatus), required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: "", trim: true },
    price: { type: Number, required: true },
    tags: { type: [String], default: null }
  },
  {
    timestamps: true
  }
);

const MongoDBShoppingItemModel = models.ShoppingItem || model<IMongoDBShoppingItemDocument>("ShoppingItem", MongoDBShoppingItemSchema);

export class MongoDBShoppingRepository implements IShoppingRepository {
  private mapToEntity(doc: IMongoDBShoppingItemDocument): ShoppingItem {
    return ShoppingItem.parse({
      id: doc._id?.toString() ?? "",
      name: doc.name,
      category: doc.category,
      status: doc.status,
      quantity: doc.quantity,
      unit: doc.unit,
      price: doc.price,
      tags: doc.tags,
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : new Date().toISOString()
    });
  }

  async create(data: ShoppingItemFormData): Promise<ShoppingItem> {
    await dbConnect();
    const item = await MongoDBShoppingItemModel.create(data);
    return this.mapToEntity(item);
  }

  async readAll(): Promise<ShoppingItem[]> {
    await dbConnect();
    const items = await MongoDBShoppingItemModel.find({}).exec();
    return items ? items.map(item => this.mapToEntity(item)) : [];
  }

  async readById(id: string): Promise<ShoppingItem | null> {
    await dbConnect();
    const item = await MongoDBShoppingItemModel.findById(id).exec();
    return item ? this.mapToEntity(item) : null;
  }

  async update(id: string, data: Partial<ShoppingItemFormData>): Promise<ShoppingItem | null> {
    await dbConnect();
    const item = await MongoDBShoppingItemModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return item ? this.mapToEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    await dbConnect();
    const item = await MongoDBShoppingItemModel.findByIdAndDelete(id).exec();
    return item !== null;
  }
}
