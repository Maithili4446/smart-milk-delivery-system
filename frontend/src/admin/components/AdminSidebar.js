import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Repeat, ShoppingCart, Receipt } from 'lucide-react';

const Sidebar = () => {


    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Customers', path: '/admin/customers', icon: Users },
        { name: 'Subscriptions', path: '/admin/subscriptions', icon: Repeat },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Billing', path: '/admin/billing', icon: Receipt },
    ];

    return (
        <aside className="w-64 bg-brand-bg border-r border-[rgba(255,255,255,0.08)] flex flex-col h-screen fixed left-0 top-0 z-50">

            {/* Logo */}
            <div className="p-6 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-highlight flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">M</span>
                </div>
                <h1 className="text-xl font-bold text-white">Smart Milk</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2">

                {menuItems.map((item) => {

                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-brand-primary text-white'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >

                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>

                        </Link>
                    );
                })}

            </nav>

            {/* Admin profile */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center space-x-3">

                    <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-white">AD</span>
                    </div>

                    <div>
                        <p className="text-sm text-white font-medium">Admin User</p>
                        <p className="text-xs text-gray-400">System Admin</p>
                    </div>

                </div>
            </div>

        </aside>
    );


};

export default Sidebar;
