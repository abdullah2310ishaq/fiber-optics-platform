import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/client";

export async function getAdminStats() {
  const [productsSnap, rfqsSnap, ordersSnap] = await Promise.all([
    getDocs(collection(db, "products")),
    getDocs(collection(db, "rfqs")),
    getDocs(collection(db, "orders")),
  ]);

  const rfqs = rfqsSnap.docs.map((d) => d.data());
  const orders = ordersSnap.docs.map((d) => d.data());

  return {
    products: productsSnap.size,
    rfqs: rfqsSnap.size,
    orders: ordersSnap.size,
    pendingRfqs: rfqs.filter((r) => r.status === "submitted" || r.status === "under_review").length,
    activeOrders: orders.filter(
      (o) => o.status !== "completed" && o.status !== "delivered"
    ).length,
  };
}
