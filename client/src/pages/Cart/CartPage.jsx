import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setCart } from "../../slices/cartSlice.jsx";
import api from "../../api/api.js";

function CartPage() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/cart").then(({ data }) => dispatch(setCart(data)));
  }, [dispatch]);

  const handleRemoveItem = async (id) => {
    try {
      await api.delete(`/cart/items/${id}`);
      dispatch(removeFromCart(id));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not remove item");
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <style>{`
        .cart-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cart-header {
          margin: 0;
          color: #292b35;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: flex-start;
        }

        .cart-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .cart-item-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          background: #f1f3f7;
          flex-shrink: 0;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-category {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #8f2632;
        }

        .cart-item-title {
          font-size: 15px;
          font-weight: 600;
          color: #292b35;
          margin: 4px 0 6px;
        }

        .cart-item-price {
          font-size: 15px;
          font-weight: 700;
          color: #292b35;
        }

        .cart-item-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-remove {
          border: none;
          background: transparent;
          color: #dc2626;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 6px;
          transition: background 0.15s ease;
        }

        .btn-remove:hover {
          background: #fef2f2;
        }

        .cart-summary {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .summary-title {
          font-size: 20px;
          font-weight: 700;
          color: #292b35;
          margin: 0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          color: #5e6270;
        }

        .summary-row.total {
          border-top: 1px solid #edf0f5;
          padding-top: 14px;
          font-size: 18px;
          font-weight: 700;
          color: #292b35;
        }

        .btn-checkout {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 8px;
          background: #8f2632;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          text-align: center;
        }

        .btn-checkout:hover {
          background: #761f29;
        }

        .empty-cart {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          padding: 56px 20px;
          text-align: center;
        }

        .empty-cart h3 {
          margin: 0 0 8px;
          font-size: 22px;
          color: #292b35;
        }

        .empty-cart p {
          color: #989ba6;
          margin: 0 0 20px;
        }

        .btn-explore {
          display: inline-block;
          padding: 12px 24px;
          background: #8f2632;
          color: #ffffff;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }

          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .cart-item-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="cart-page">
        <h1 className="cart-header">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add some items from the marketplace to get started.</p>
            <Link to="/products" className="btn-explore">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-item-img"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.category}</span>
                    <h3 className="cart-item-title">{item.title}</h3>
                    <div className="cart-item-price">
                      ${Number(item.price).toLocaleString()}
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Summary</h2>
              <div className="summary-row">
                <span>Items ({cartItems.length})</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <button
                type="button"
                className="btn-checkout"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
