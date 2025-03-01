import OrderCard from "@/components/ProfileComponents/OrderCard";
import { Order } from "@/types/Orders";
import React from "react";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Orders",
};

// Placeholder Orders Array with Multiple Products
const orders: Order[] = [
  {
    id: "240810ugjyxkm1",
    status: "Shipped",
    products: [
      {
        productImage: "/productImg1.svg",
        quantity: 50,
        size: '2 "x 3.5"',
        color: "فضي",
        edges: "دائرية",
        status: "delivered",
        price: "225",
      },
      {
        productImage: "/productImg2.svg",
        quantity: 100,
        size: '2 "x 3.5"',
        color: "ذهبي",
        edges: "مستقيمة",
        status: "delivered",
        price: "50",
      },
    ],
    totalPrice: 128,
    deliveryDate: "4 Aug, 2025",
  },
  {
    id: "240810ugjyxkm2",
    status: "Delivered",
    products: [
      {
        productImage: "/productImg2.svg",
        quantity: 75,
        size: '2 "x 3.5"',
        color: "برونزي",
        edges: "مستقيمة",
        status: "delivered",
        price: "80",
      },
      {
        productImage: "/productImg1.svg",
        quantity: 75,
        size: '2 "x 3.5"',
        color: "برونزي",
        edges: "مستقيمة",
        status: "returned",
        price: "140",
      },
    ],
    totalPrice: 120,
    deliveryDate: "2 Jun, 2025",
  },
  {
    id: "240810ugjyxkm3",
    status: "Cancelled",
    products: [
      {
        productImage: "/productImg1.svg",
        quantity: 50,
        size: '2 "x 3.5"',
        color: "فضي",
        edges: "دائرية",
        status: "cancelled",
        price: "225",
      },
    ],
    totalPrice: 225,
    deliveryDate: "4 Aug, 2025",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Orders Header */}
      <p className="text-2xl text-shadeBlack font-bold">Orders</p>
      {/* Conditional Rendering */}
      {orders.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-shadeBlack">No previous order history</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
