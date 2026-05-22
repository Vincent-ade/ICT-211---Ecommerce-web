import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "@/context/CartContext";

const COL = "products";

export async function fetchProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function saveProduct(product: Product): Promise<void> {
  const { id, ...data } = product;
  await setDoc(doc(db, COL, id), data);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

export async function seedProducts(products: Product[]): Promise<void> {
  const batch = writeBatch(db);
  products.forEach((p) => {
    const { id, ...data } = p;
    batch.set(doc(db, COL, id), data);
  });
  await batch.commit();
}