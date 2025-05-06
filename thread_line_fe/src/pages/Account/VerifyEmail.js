import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth/verify-email?token=${token}`, {
                method: "GET"
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (res.ok) {
                        setSuccess(data.message || "Email verified successfully!");
                        setTimeout(() => navigate("/signin"), 2500);
                    } else {
                        setError(data.message || "Verification failed");
                        setTimeout(() => navigate("/"), 3000);
                    }
                })
                .catch(() => {
                    setError("Network error. Please try again later.");
                    setTimeout(() => navigate("/"), 3000);
                })
                .finally(() => setLoading(false));
        } else {
            setError("No token provided");
            setLoading(false);
            setTimeout(() => navigate("/"), 2000);
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                <img src="/img/logo.jpg" alt="ThreadLine Logo" className="w-20 mb-6" />
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Email Verification</h1>
                {loading && (
                    <>
                        <div className="flex flex-col items-center">
                            <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            <p className="text-lg text-gray-600">Verifying your email, please wait...</p>
                        </div>
                    </>
                )}
                {success && (
                    <div className="w-full mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-lg font-semibold">
                        {success}
                        <div className="text-sm text-gray-500 mt-2">Redirecting to sign in...</div>
                    </div>
                )}
                {error && (
                    <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-lg font-semibold">
                        {error}
                        <div className="text-sm text-gray-500 mt-2">Redirecting to home...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
