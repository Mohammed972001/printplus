import { Order } from "@/types/Orders";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="w-full rounded-lg border border-cardBorder flex flex-col gap-6 px-4 py-6 lg:px-8 text-shadeBlack">
      {/* Card Header */}
      <div className="w-full flex flex-col gap-4 lg:flex-row items-center justify-between">
        {/* Status, Order and Total right side */}
        <div className="flex flex-col gap-4 lg:flex-row items-center justify-between w-full lg:w-[499px]">
          {/* Status */}
          <div className="flex justify-between lg:flex-col lg:gap-1">
            <p className="font-semibold">Status</p>
            <p>{order.status}</p>
          </div>
          {/* Order Number */}
          <div className="flex justify-between lg:flex-col lg:gap-1">
            <p className="font-semibold">Order Number</p>
            <p>#{order.id}</p>
          </div>
          {/* Total */}
          <div className="flex justify-between lg:flex-col lg:gap-1">
            <p className="font-semibold">Total</p>
            <p>{order.totalPrice} SAR</p>
          </div>
        </div>
        {/* Details Button left side */}
        <Link
          href={`/profile/orders/${order.id}`}
          className="w-full lg:w-fit flex justify-center items-center"
        >
          <button className="w-full lg:w-[110px] h-[48px] rounded-lg px-3 py-[10px] bg-[#F1F5F9] flex justify-center items-center">
            <p className="font-semibold text-nowrap">See details</p>
          </button>
        </Link>
      </div>
      <hr />

      {/* Card Body */}
      <div className="flex flex-col gap-4">
        {/* ✅ Show cancellation message if status is "cancelled" */}
        {order.status === "Cancelled" ? (
          <div className="flex flex-col gap-2 max-w-[718px]">
            <p className="font-semibold">Cancellation requested</p>
            <p className="text-[#475569] text-sm">
              We’ll do our best to cancel your order! You’ll get an email in
              about 1-2 hours letting you know if the cancellation was
              successful.
            </p>
          </div>
        ) : (
          <p className="font-semibold">
            {order.status === "Delivered"
              ? `Delivered : ${order.deliveryDate}`
              : `Estimated delivery: ${order.deliveryDate}`}
          </p>
        )}

        {/* Products List */}
        {order.products.map((product, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-[10px]">
                {/* Product Image with Blur for Returned */}
                <Image
                  src={product.productImage}
                  alt="productImg"
                  width={70}
                  height={90}
                  className={`self-center ${
                    product.status === "returned" ? "opacity-50" : ""
                  }`}
                />
                {/* Product Details */}
                <div className="flex flex-col gap-[2.67px]">
                  <p className="font-semibold">Gold business cards</p>
                  <p className="text-[#475569] text-sm">
                    Qty: {product.quantity}
                  </p>
                  <p className="text-[#475569] text-sm">Size: {product.size}</p>
                  <p className="text-[#475569] text-sm">
                    Edges: {product.edges}
                  </p>
                  <p className="text-[#475569] text-sm">
                    Foil Color: {product.color}
                  </p>
                  {product.status === "returned" && (
                    <div className="w-[66px] h-[24px] px-[6px] font-semibold bg-[#F1F5F9] text-xs flex justify-center items-center">
                      Returned
                    </div>
                  )}
                </div>
              </div>
              <p className="font-semibold self-center">{product.price} SAR</p>
            </div>
            {/* Add <hr /> after each product except the last one */}
            {index !== order.products.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
