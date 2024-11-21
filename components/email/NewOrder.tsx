import { CartWithTotal } from "@/types/cart"
import { OrderSubmission } from "@/types/tigerTransaction"

type Props = {
  order: OrderSubmission
  cart: CartWithTotal
}

export const NewOrderEmailTemplate = (props: Props) => (
  <div>
    <h1 style={{ color: "#333", fontSize: "24px", fontWeight: "bold", margin: "0 0 20px" }}>
      New Order Received
    </h1>

    <div
      style={{ background: "#e5e7eb", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}
    >
      <h2 style={{ color: "#374151", fontSize: "18px", marginBottom: "15px" }}>
        Customer Information
      </h2>
      <p style={{ margin: "5px 0", color: "#4b5563" }}>
        <strong>Name:</strong> {props.order.shipping_first_name} {props.order.shipping_last_name}
      </p>
      <p style={{ margin: "5px 0", color: "#4b5563" }}>
        <strong>Email:</strong> {props.order.email}
      </p>
      <p style={{ margin: "5px 0", color: "#4b5563" }}>
        <strong>Phone:</strong> {props.order.phone}
      </p>
    </div>

    <div
      style={{ background: "#e5e7eb", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}
    >
      <h2 style={{ color: "#374151", fontSize: "18px", marginBottom: "15px" }}>Shipping Address</h2>
      <p style={{ margin: "5px 0", color: "#4b5563" }}>
        {props.order.shipping_first_name} {props.order.shipping_last_name}
      </p>
      <p style={{ margin: "5px 0", color: "#4b5563" }}>{props.order.shipping_address1}</p>
      {props.order.address2 && (
        <p style={{ margin: "5px 0", color: "#4b5563" }}>{props.order.shipping_address2}</p>
      )}
      <p style={{ margin: "5px 0", color: "#4b5563" }}>
        {props.order.shipping_city}, {props.order.shipping_state} {props.order.shipping_zip}
      </p>
      {/* <p style={{ margin: "5px 0", color: "#4b5563" }}>{props.order.country}</p> */}
    </div>

    <div
      style={{ background: "#e5e7eb", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}
    >
      <h2 style={{ color: "#374151", fontSize: "18px", marginBottom: "15px" }}>Order Details</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ textAlign: "left", padding: "8px", color: "#374151" }}>Product</th>
            <th style={{ textAlign: "right", padding: "8px", color: "#374151" }}>Quantity</th>
            <th style={{ textAlign: "right", padding: "8px", color: "#374151" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.cart.items.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #d1d5db" }}>
              <>
                <td style={{ padding: "8px", color: "#4b5563" }}>{item.title}</td>
                <td style={{ textAlign: "right", padding: "8px", color: "#4b5563" }}>
                  {item.quantity}
                </td>
                <td style={{ textAlign: "right", padding: "8px", color: "#4b5563" }}>
                  ${(Number(item.amount) * item.quantity).toFixed(2)}
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <p style={{ margin: "5px 0", color: "#4b5563" }}>
          <strong>Total:</strong> ${props.order.amount}
        </p>
      </div>
    </div>

    <div style={{ textAlign: "center", color: "#6b7280", fontSize: "14px", marginTop: "30px" }}>
      <p>This is an automated message, please do not reply directly to this email.</p>
    </div>
  </div>
)
