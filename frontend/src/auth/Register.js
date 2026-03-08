import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        delivery_area: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await register(formData);
        if (res.success) {
            navigate("/");
        } else {
            setError(res.error || "Failed to register. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-10 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            <div className="relative z-10 w-full max-w-lg p-8 sm:p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl mx-4 my-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.5)] text-indigo-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create an Account</h2>
                    <p className="text-gray-400 text-sm">Join Smart Milk to manage your dairy deliveries</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                            <input
                                name="username"
                                type="text"
                                className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors sm:text-sm"
                                placeholder="john_doe"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors sm:text-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors sm:text-sm"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                            <input
                                name="phone"
                                type="text"
                                className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors sm:text-sm"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Delivery Area</label>
                            <input
                                name="delivery_area"
                                type="text"
                                className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors sm:text-sm"
                                placeholder="Sector 14"
                                value={formData.delivery_area}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Address</label>
                        <textarea
                            name="address"
                            rows="2"
                            className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors sm:text-sm resize-none"
                            placeholder="Apt 101, Sun City complex..."
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all disabled:opacity-50"
                        >
                            {loading ? "Creating Account..." : "Register Now"}
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Subtle floating background elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        </div>
    );
}

export default Register;
