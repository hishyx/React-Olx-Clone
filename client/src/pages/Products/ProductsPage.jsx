import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/productSlice.jsx";
import { addToCart } from "../../slices/cartSlice.jsx";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data.js";

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  const {
    items: filteredProducts,
    loading,
    error,
  } = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, maxPrice }));
  }, [dispatch, selectedCategory, maxPrice]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setMaxPrice("");
  };

  return (
    <>
      <style>{`
        .products-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .products-header h1 {
          margin: 0;
          color: #292b35;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .filter-bar {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-group label {
          font-size: 14px;
          font-weight: 600;
          color: #292b35;
        }

        .filter-select,
        .filter-input {
          padding: 10px 14px;
          border: 1px solid #d5d8df;
          border-radius: 8px;
          background: #ffffff;
          color: #292b35;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .filter-select:focus,
        .filter-input:focus {
          border-color: #8f2632;
          box-shadow: 0 0 0 3px rgba(143, 38, 50, 0.1);
        }

        .btn-reset-filters {
          padding: 10px 16px;
          border: 1px solid #d5d8df;
          border-radius: 8px;
          background: #ffffff;
          color: #8f2632;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-reset-filters:hover {
          background: #fdf8f8;
          border-color: #8f2632;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .product-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          background: #f1f3f7;
        }

        .product-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-category {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #8f2632;
          margin-bottom: 6px;
        }

        .product-price {
          font-size: 20px;
          font-weight: 700;
          color: #292b35;
          margin-bottom: 6px;
        }

        .product-title {
          font-size: 15px;
          font-weight: 600;
          color: #292b35;
          margin: 0 0 8px;
          line-height: 1.4;
        }

        .product-location {
          font-size: 13px;
          color: #989ba6;
          margin-bottom: 16px;
        }

        .btn-add-cart {
          margin-top: auto;
          width: 100%;
          padding: 11px;
          border: none;
          border-radius: 8px;
          background: #8f2632;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .btn-add-cart:hover {
          background: #761f29;
        }

        .empty-products {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          padding: 48px 20px;
          text-align: center;
          color: #989ba6;
        }

        .empty-products h3 {
          margin: 0 0 8px;
          color: #292b35;
        }
      `}</style>

      <div className="products-page">
        <div className="products-header">
          <h1>Explore Marketplace</h1>
        </div>

        {/* Basic Category & Price Filtering */}
        <div className="filter-bar">
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              id="maxPrice"
              type="number"
              className="filter-input"
              placeholder="e.g. 1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {(selectedCategory !== "All" || maxPrice) && (
            <button
              type="button"
              className="btn-reset-filters"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-products">
            <h3>No products found</h3>
            <p>Try clearing your category or price filter.</p>
            <button
              type="button"
              className="btn-reset-filters"
              onClick={handleResetFilters}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="product-img"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="product-body">
                  <span className="product-category">{product.category}</span>
                  <div className="product-price">
                    ${Number(product.price).toLocaleString()}
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-location">{product.description}</div>
                  <button
                    type="button"
                    className="btn-add-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  {String(product.seller) === String(user?.id) && (
                    <Link
                      className="btn-add-cart"
                      to={`/sell?id=${product._id}`}
                    >
                      Edit Listing
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsPage;
