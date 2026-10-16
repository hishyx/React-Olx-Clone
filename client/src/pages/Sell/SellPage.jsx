import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../api/api.js";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../data.js";
function SellPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get("id");

  useEffect(() => {
    if (!productId) return;
    api
      .get(`/products/${productId}`)
      .then(({ data }) => reset(data))
      .catch((error) => {
        toast.error(error.response?.data?.message || "Could not load listing");
      });
  }, [productId, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, price: Number(data.price) };
      if (productId) await api.patch(`/products/${productId}`, payload);
      else await api.post("/products", payload);
      toast.success(
        productId ? "Listing updated" : "Product listed successfully!",
      );
      navigate("/my-products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not list product");
    }
  };

  const onError = () => {
    toast.error("Please fill in all required fields correctly");
  };

  return (
    <>
      <style>{`
        .sell-container {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }

        .sell-card {
          width: 100%;
          max-width: 580px;
          padding: 42px 48px;
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .sell-header {
          margin-bottom: 32px;
        }

        .sell-header p {
          margin: 0 0 8px;
          color: #989ba6;
          font-size: 15px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sell-header h1 {
          margin: 0;
          color: #292b35;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .sell-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #292b35;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 15px;
          border: 1px solid #d5d8df;
          border-radius: 8px;
          background: #ffffff;
          color: #292b35;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #8f2632;
          box-shadow: 0 0 0 3px rgba(143, 38, 50, 0.1);
        }

        .form-group input.has-error,
        .form-group select.has-error,
        .form-group textarea.has-error {
          border-color: #dc2626;
        }

        .field-error {
          color: #dc2626;
          font-size: 13px;
          font-weight: 500;
        }

        .sell-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 8px;
          background: #8f2632;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .sell-button:hover {
          background: #761f29;
        }

        .sell-button:active {
          transform: scale(0.99);
        }

        @media (max-width: 600px) {
          .sell-card {
            padding: 30px 20px;
          }

          .sell-header h1 {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="sell-container">
        <div className="sell-card">
          <div className="sell-header">
            <p>Post your advertisement</p>
            <h1>{productId ? "Update Listing" : "Sell an Item"}</h1>
          </div>

          <form
            className="sell-form"
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
          >
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Product Title *</label>
              <input
                id="title"
                type="text"
                placeholder="e.g. iPhone 15 Pro Max 256GB"
                className={errors.title ? "has-error" : ""}
                {...register("title", {
                  required: "Product title is required",
                })}
              />
              {errors.title && (
                <span className="field-error">{errors.title.message}</span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                className={errors.category ? "has-error" : ""}
                {...register("category", {
                  required: "Please select a category",
                })}
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="field-error">{errors.category.message}</span>
              )}
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                id="price"
                type="number"
                placeholder="e.g. 500"
                className={errors.price ? "has-error" : ""}
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 1,
                    message: "Price must be a positive number greater than 0",
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <span className="field-error">{errors.price.message}</span>
              )}
            </div>

            {/* Image URL */}
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL *</label>
              <input
                id="imageUrl"
                type="url"
                placeholder="https://images.unsplash.com/..."
                className={errors.imageUrl ? "has-error" : ""}
                {...register("imageUrl", { required: "Image URL is required" })}
              />
              {errors.imageUrl && (
                <span className="field-error">{errors.imageUrl.message}</span>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                rows="4"
                placeholder="Describe your item condition, specifications, and details..."
                className={errors.description ? "has-error" : ""}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long",
                  },
                })}
              />
              {errors.description && (
                <span className="field-error">
                  {errors.description.message}
                </span>
              )}
            </div>

            <button type="submit" className="sell-button">
              {productId ? "Save Changes" : "Post Ad"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SellPage;
