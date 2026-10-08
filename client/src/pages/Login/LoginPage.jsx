import { useForm } from "react-hook-form";
import api from "../../api/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice.jsx";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUser(data) {
    try {
      const response = await api.post("/login", data);

      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.user));

      toast.success("Login Successfull");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to log in");
    }
  }

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #f8f9fb;
        }

        .login-card {
          width: 100%;
          max-width: 500px;
          padding: 42px 50px 48px;
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .login-header {
          margin-bottom: 42px;
        }

        .login-header p {
          margin: 0 0 10px;
          color: #989ba6;
          font-size: 17px;
          font-weight: 500;
        }

        .login-header h1 {
          margin: 0;
          color: #292b35;
          font-size: 34px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group input {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 15px;
          border: 1px solid #d5d8df;
          border-radius: 8px;
          background: #ffffff;
          color: #292b35;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input-group input::placeholder {
          color: #999ca7;
        }

        .input-group input:focus {
          border-color: #8f2632;
          box-shadow: 0 0 0 3px rgba(143, 38, 50, 0.1);
        }

        .forgot-password {
          text-align: right;
          margin-top: -10px;
        }

        .forgot-password a {
          color: #8f2632;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }

        .forgot-password a:hover {
          color: #6f1d27;
        }

        .login-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 8px;
          background: #8f2632;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .login-button:hover {
          background: #761f29;
        }

        .login-button:active {
          transform: scale(0.99);
        }

        .register-text {
          margin: 24px 0 0;
          text-align: center;
          color: #999ca7;
          font-size: 14px;
        }

        .register-text a {
          color: #8f2632;
          font-weight: 500;
          text-decoration: none;
        }

        .register-text a:hover {
          color: #6f1d27;
        }

        @media (max-width: 600px) {
          .login-card {
            padding: 35px 25px 40px;
          }

          .login-header h1 {
            font-size: 30px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <p>Please enter your details</p>
            <h1>Welcome back</h1>
          </div>

          <form className="login-form" onSubmit={handleSubmit(loginUser)}>
            <div className="input-group">
              <input
                {...register("email", { required: "Email is required" })}
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
              />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <input
                {...register("password", { required: "Password is required" })}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && <span className="field-error">{errors.password.message}</span>}
            </div>

            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="register-text">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
