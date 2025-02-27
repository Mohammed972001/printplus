import React from "react";

interface OrderStatusTimelineProps {
  status: string;
  deliveryDate: string;
}

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  status,
  deliveryDate,
}) => {
  const isCancelled = status === "Cancelled";

  return (
    <div className="flex flex-col gap-4">
      {/* Timeline Steps */}
      <div className="flex flex-col gap-8">
        {/* Ordered */}
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Ordered</p>
            <p className="text-sm text-[#475569]">28 Jul, 2022</p>
          </div>
        </div>

        {/* Processing */}
        <div className="flex items-center gap-4">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              status === "Processing" ||
              status === "Shipped" ||
              status === "Delivered" ||
              isCancelled
                ? "bg-[#3B82F6]"
                : "bg-[#E2E8F0]"
            }`}
          >
            {status === "Processing" ||
            status === "Shipped" ||
            status === "Delivered" ||
            isCancelled ? (
              <span className="text-white text-sm">✓</span>
            ) : (
              <span className="text-[#475569] text-sm">2</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Processing</p>
          </div>
        </div>

        {/* Cancellation Request (Only for Cancelled Orders) */}
        {isCancelled && (
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-[#BE123C] flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">Cancellation Request</p>
            </div>
          </div>
        )}

        {/* Shipped (Only for Non-Cancelled Orders) */}
        {!isCancelled && (
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                status === "Shipped" || status === "Delivered"
                  ? "bg-[#3B82F6]"
                  : "bg-[#E2E8F0]"
              }`}
            >
              {status === "Shipped" || status === "Delivered" ? (
                <span className="text-white text-sm">✓</span>
              ) : (
                <span className="text-[#475569] text-sm">3</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">Shipped</p>
              <p className="text-sm text-[#475569]">On its way</p>
            </div>
          </div>
        )}

        {/* Estimated Delivery (Only for Non-Cancelled Orders) */}
        {!isCancelled && (
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                status === "Delivered" ? "bg-[#3B82F6]" : "bg-[#E2E8F0]"
              }`}
            >
              {status === "Delivered" ? (
                <span className="text-white text-sm">✓</span>
              ) : (
                <span className="text-[#475569] text-sm">4</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">
                {status === "Delivered" ? "Delivered" : "Estimated Delivery"}
              </p>
              <p className="text-sm text-[#475569]">
                {status === "Delivered" ? deliveryDate : `Expected by ${deliveryDate}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;