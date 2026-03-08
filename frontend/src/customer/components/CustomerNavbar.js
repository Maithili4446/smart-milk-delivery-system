import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../../auth/AuthContext';

const CustomerNavbar = () => {


    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="w-full bg-[#3B1140] border-b border-[#DCA06D]/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#DCA06D] to-[#A55B4B] rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-xl font-bold text-white">
                                Smart<span className="text-[#DCA06D]">Milk</span>
                            </span>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for milk, paneer, and groceries..."
                                className="w-full bg-[#2A0E30] border border-[#4F1C51] rounded-full pl-5 pr-12 py-2.5 text-sm text-white placeholder-gray-400"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#A55B4B] text-white rounded-full">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white">
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 text-xs bg-[#DCA06D] text-white px-1 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Username */}
                        <Link to="/profile" className="flex items-center gap-2 text-white">
                            <User className="w-5 h-5" />
                            <span className="text-sm">
                                Hi, {user?.name || user?.username}
                            </span>
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={logout}
                            className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>

                    </div>

                </div>
            </div>
        </nav>
    );


};

export default CustomerNavbar;
