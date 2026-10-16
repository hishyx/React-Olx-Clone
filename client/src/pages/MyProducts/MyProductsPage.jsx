import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProducts } from "../../slices/productSlice.jsx";

function MyProductsPage() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  return (
    <div className="my-products-page">
      <style>{`
        .my-products-page { display: flex; flex-direction: column; gap: 24px; }
        .my-products-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .my-products-header h1 { margin: 0; color: #292b35; font-size: 32px; }
        .my-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
        .my-product-card { background: #fff; border: 1px solid #d9dce2; border-radius: 9px; overflow: hidden; }
        .my-product-card img { width: 100%; height: 180px; object-fit: cover; background: #f1f3f7; }
        .my-product-body { padding: 16px; }
        .my-product-body h3 { margin: 6px 0; color: #292b35; }
        .my-product-category { color: #8f2632; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .my-product-price { color: #292b35; font-size: 20px; font-weight: 700; }
        .my-product-description { color: #989ba6; margin: 8px 0 16px; }
        .my-product-edit { display: block; padding: 10px; border-radius: 8px; background: #8f2632; color: #fff; text-align: center; text-decoration: none; font-weight: 600; }
        .my-products-empty { padding: 48px 20px; text-align: center; background: #fff; border: 1px solid #d9dce2; border-radius: 9px; }
        .my-products-empty h3 { color: #292b35; }
      `}</style>
      <div className="my-products-header">
        <h1>My Products</h1>
        <Link className="btn-sell-nav" to="/sell">+ SELL</Link>
      </div>
      {loading ? <p>Loading your products...</p> : error ? <p>{error}</p> : products.length === 0 ? (
        <div className="my-products-empty"><h3>You have no products yet</h3><p>List something for sale to see it here.</p></div>
      ) : (
        <div className="my-products-grid">
          {products.map((product) => (
            <div className="my-product-card" key={product._id}>
              <img src={product.imageUrl} alt={product.title} />
              <div className="my-product-body">
                <span className="my-product-category">{product.category}</span>
                <div className="my-product-price">${Number(product.price).toLocaleString()}</div>
                <h3>{product.title}</h3>
                <div className="my-product-description">{product.description}</div>
                <Link className="my-product-edit" to={`/sell?id=${product._id}`}>Edit Listing</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProductsPage;
