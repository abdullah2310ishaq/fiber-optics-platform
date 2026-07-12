import { collection, getDocs } from "firebase/firestore";
import { getDb } from "@/app/firebase/firestore";

export async function getAdminStats() {
  const [productsSnap, rfqsSnap, ordersSnap] = await Promise.all([
    getDocs(collection(getDb(), "products")),
    getDocs(collection(getDb(), "rfqs")),
    getDocs(collection(getDb(), "orders")),
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
