import { ShoppingItem } from "./entities/ShoppingItem";

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function readShoppingItems() {
  try {
    const res = await fetch(baseApiUrl + "/shopping/search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createShoppingItem(item: ShoppingItem) {
  try {
    const res = await fetch(baseApiUrl + "/shopping/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return res.status;
  } catch (error) {
    console.error(error);
    return 500;
  }
}

export async function updateShoppingItem(item: ShoppingItem, callback: Function) {
  try {
    const res = await fetch(baseApiUrl + "/shopping/search", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    // const res = {
    //   ok: true,
    //   status: 200
    // }
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    callback(true);
    return res.status;
  } catch (error) {
    console.error(error);
    callback(false);
    return 500;
  }
}

export async function deleteShoppingItem(item: ShoppingItem) {
  try {
    const res = await fetch(baseApiUrl + "/shopping/search", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.status;
  } catch (error) {
    console.error(error);
    return 500;
  }
}
