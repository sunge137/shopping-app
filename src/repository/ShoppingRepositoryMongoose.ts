import { IShoppingItemEntity, ShoppingStatus, TShoppingItem } from "@model/ShoppingItem";
import { Document, model, models, Schema } from "mongoose";
import { IShoppingRepository } from "./ShoppingRepository";
import { dbConnect } from "./mongodb";

interface IMongoDBShoppingItemDocument extends Document, TShoppingItem {
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
  private mapToEntity(doc: IMongoDBShoppingItemDocument): IShoppingItemEntity {
    return {
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
    };
  }

  async create(data: TShoppingItem): Promise<IShoppingItemEntity> {
    await dbConnect();
    const item = await MongoDBShoppingItemModel.create(data);
    return this.mapToEntity(item);
  }

  async readAll(): Promise<IShoppingItemEntity[]> {
    await dbConnect();
    const items = await MongoDBShoppingItemModel.find({}).exec();
    return items ? items.map(item => this.mapToEntity(item)) : [];
  }

  async readById(id: string): Promise<IShoppingItemEntity | null> {
    await dbConnect();
    const item = await MongoDBShoppingItemModel.findById(id).exec();
    return item ? this.mapToEntity(item) : null;
  }

  async update(id: string, data: Partial<TShoppingItem>): Promise<IShoppingItemEntity | null> {
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
