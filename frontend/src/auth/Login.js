import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {


    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await login(username, password);

        if (res.success) {

            if (res.user?.is_staff) {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } else {
            setError(res.error || "Invalid username or password");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">

            <div className="w-full max-w-md p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Login to Smart Milk
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-400">
                            Sign up
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );


}

export default Login;
