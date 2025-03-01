import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Order } from "@/types/Orders";
import OrderStatusTimeline from "@/components/ProfileComponents/OrderStatusTimeline";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Order Details",
};

// Placeholder Orders Array
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

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  // Find the order by ID
  const order = orders.find((order) => order.id === params.id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex flex-col gap-12 text-shadeBlack me-0 xl:me-[148px]">
      {/* Breadcrumb Navigation */}
      <div className="flex md:justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <p className="text-sm">Orders</p>
            <FaChevronRight className="size-[10px]" />
            <p className="text-[#475569] text-sm">Order #{params.id}</p>
          </div>
          {/* Display the actual delivery date or cancellation message */}
          <div className="text-xl font-bold">
            {order.status === "Cancelled" ? (
              <div className="flex flex-col gap-3 max-w-[383px]">
                <p className="font-bold text-3xl">Cancellation requested</p>
                <p className="text-black">
                  We’ll do our best to cancel your order! You’ll get an email in
                  about 1-2 hours letting you know if the cancellation was
                  successful.
                </p>
              </div>
            ) : order.status === "Delivered" ? (
              `Delivered on ${order.deliveryDate}`
            ) : (
              `Estimated delivery: ${order.deliveryDate}`
            )}
          </div>
        </div>
        {/* Cancel Order Button (only show if status is not "Delivered" or "Cancelled") */}
        {order.status !== "Delivered" && order.status !== "Cancelled" && (
          <button className="hidden md:flex items-center gap-2 self-end">
            <Image src={"/cancelRed.svg"} alt="cancel" width={20} height={20} />
            <p className="font-bold text-[#BE123C] text-sm">Cancel order</p>
          </button>
        )}
      </div>

      {/* Order Details */}
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-6">
            {/* Replace OrderTimeline with OrderStatusTimeline */}
            <OrderStatusTimeline
              status={order.status}
              deliveryDate={order.deliveryDate}
            />
          </div>
          <div className="flex flex-col gap-4">
            <hr />
            {/* Shipping Address */}
            <div className="flex flex-col gap-2">
              <p className="font-bold">Shipping address</p>
              <div className="flex flex-col gap-4">
                <p>
                  Aisha Al-Fahad, 78 Al-Masjid Road, Jeddah, 21442, Kingdom of
                  Saudi Arabia
                </p>
                <hr />
              </div>
            </div>
            {/* Payment Method */}
            <div className="flex flex-col gap-2">
              <p className="font-bold">Payment method</p>
              <p>Mastercard ending in 4242</p>
            </div>
            <hr />
          </div>
        </div>
        <div className="md:min-w-[384px] border border-cardBorder rounded-lg px-6 py-[22px] flex flex-col gap-[10px]">
          {/* Products List */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
              {/* Product list header */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Order #{params.id}</p>
                  <p className="text-sm">Ordered {order.deliveryDate}</p>
                  {/* Cancel Order Button (only show if status is not "Delivered" or "Cancelled") */}
                  {order.status !== "Delivered" &&
                    order.status !== "Cancelled" && (
                      <button className="flex md:hidden items-center gap-2">
                        <Image
                          src={"/cancelRed.svg"}
                          alt="cancel"
                          width={20}
                          height={20}
                        />
                        <p className="font-bold text-[#BE123C] text-sm">
                          Cancel order
                        </p>
                      </button>
                    )}
                </div>
                <hr />
              </div>
              {/* Product list cards */}
              {order.products.map((product, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-[10px]">
                      {/* Product Image */}
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
                        <p className="text-nowrap">Gold business cards</p>
                        <p className="text-[#475569] text-sm">
                          Qty: {product.quantity}
                        </p>
                        <p className="text-[#475569] text-sm">
                          Size: {product.size}
                        </p>
                        <p className="text-[#475569] text-sm">
                          Edges: {product.edges}
                        </p>
                        <p className="text-[#475569] text-sm">
                          Foil Color: {product.color}
                        </p>
                        {product.status === "returned" && (
                          <div className="w-[66px] h-[24px] px-[6px] font-bold bg-[#F1F5F9] text-xs flex justify-center items-center">
                            Returned
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="font-bold self-center">{product.price} SAR</p>
                  </div>
                  {/* Add <hr /> after each product except the last one */}
                  {index !== order.products.length - 1 && <hr />}
                </React.Fragment>
              ))}
              {/* Bill details */}
              <div className="flex flex-col gap-4">
                <hr />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 text-sm">
                    <p>Subtotal</p>
                    <p>VAT</p>
                    <p>Delivery</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <p>40 SAR</p>
                    <p>6 SAR</p>
                    <p>12 SAR</p>
                  </div>
                </div>
                <hr />
              </div>
              {/* Total Payment */}
              <div className="flex justify-between items-center">
                <p>Total</p>
                <p className="font-bold text-2xl">56.34 SAR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;