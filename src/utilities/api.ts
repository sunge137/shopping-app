import { ShoppingItem } from "@model/ShoppingItem";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
}

export async function createShoppingItem(item: Partial<ShoppingItem>) {
  try {
    const res = await fetch(`${BASE_URL}/shopping/search`, {
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

export async function getShoppingItems(): Promise<ShoppingItem[]> {
  const res = await fetch(`${BASE_URL}/shopping/search`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch shopping items: ${res.statusText}`);
  }
  return res.json();
}

export async function updateShoppingItem(item: ShoppingItem, callback?: Function) {
  const res = await fetch(`${BASE_URL}/shopping/search`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch shopping items: ${res.statusText}`);
  }
  if (callback) {
    callback(true);
  }
  return res.json();
}

// export async function deleteShoppingItem(item: ShoppingItem) {
//   try {
//     const res = await fetch(baseApiUrl + "/shopping/search", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return res.status;
//   } catch (error) {
//     console.error(error);
//     return 500;
//   }
// }