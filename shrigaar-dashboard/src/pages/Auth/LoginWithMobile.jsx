import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./LoginWithMobile.css";

const LoginWithMobile = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  const sendOtp = async () => {
    setError("");

    if (phone.length !== 10) {
      setError("Enter valid 10 digit mobile number");
      return;
    }

    const fullPhone = `+91${phone}`;

    try {
      setLoading(true);

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);

      setConfirmationResult(result);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");

    if (!confirmationResult) {
      setError("Request OTP first");
      return;
    }

    if (otp.length !== 6) {
      setError("Enter valid 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-login-wrapper">
      <div className="mobile-login-card">
        <h2>Welcome To Shrigaar Dashboard 👋</h2>
        <p className="subtitle">Login using your mobile number</p>

        {/* Phone Input */}
        <div className="phone-input-group">
          <span className="country-code">+91</span>
          <input
            type="tel"
            maxLength="10"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <button className="mobile-btn" onClick={sendOtp} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {confirmationResult && (
          <>
            <input
              className="otp-input"
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />

            <button
              className="mobile-btn"
              onClick={verifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {error && <p className="error-text">{error}</p>}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default LoginWithMobile;
