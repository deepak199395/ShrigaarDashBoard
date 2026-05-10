import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://api.shrigaar.com/api/v1/shrigar/order/list/api58"
      );
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Cancel Order (frontend demo)
  const handleCancel = (id) => {
    alert("Order Cancelled ❌ (Connect API later)");
  };

  // ✅ Invoice Download
  const downloadInvoice = (order) => {
    const text = `
Order ID: ${order._id}
Total: ₹${order.totalAmount}
Status: ${order.orderStatus}
Customer: ${order.address.fullName}
`;

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.txt";
    link.click();
  };

  // ✅ Timeline UI
  const getStep = (status) => {
    if (status === "PLACED") return 1;
    if (status === "SHIPPED") return 2;
    if (status === "DELIVERED") return 3;
    return 1;
  };

  return (
    <div className="order-container">
      {orders.map((order) => {
        const step = getStep(order.orderStatus);

        return (
          <div className="order-card" key={order._id}>
            
            {/* 🔥 HEADER */}
            <div className="order-header">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            </div>

            {/* 🔥 TIMELINE */}
            <div className="timeline">
              <div className={step >= 1 ? "active" : ""}>Placed</div>
              <div className={step >= 2 ? "active" : ""}>Shipped</div>
              <div className={step >= 3 ? "active" : ""}>Delivered</div>
            </div>

            {/* 🔥 ACTIONS */}
            <div className="actions">
              <button onClick={() => setExpanded(order._id)}>
                {expanded === order._id ? "Hide Details" : "View Details"}
              </button>

              <button onClick={() => downloadInvoice(order)}>
                Download Invoice
              </button>

              <button
                className="cancel-btn"
                onClick={() => handleCancel(order._id)}
              >
                Cancel Order
              </button>
            </div>

            {/* 🔥 EXPAND DETAILS */}
            {expanded === order._id && (
              <div className="order-details">

                {/* ITEMS */}
                {order.items.map((item) => (
                  <div className="item-card" key={item._id}>
                    <img src={item.image} alt="" />
                    <div>
                      <h4>{item.productName}</h4>
                      <p>Qty: {item.qty}</p>
                      <p>₹{item.priceAfterDiscount}</p>
                    </div>
                  </div>
                ))}

                {/* ADDRESS */}
                <div className="address">
                  <h4>Delivery Address</h4>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.phone}</p>
                  <p>{order.address.addressLine}</p>
                  <p>
                    {order.address.city}, {order.address.state}
                  </p>
                </div>

              </div>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default Orders;