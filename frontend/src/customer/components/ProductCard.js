import React from 'react';
import { ShoppingCart, Calendar, Star, Check } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import API from '../../services/api';

const ProductCard = ({ product }) => {
    const { addToCart } = React.useContext(CartContext);
    const [added, setAdded] = React.useState(false);

    const imageUrl = product.image_url || 'https://via.placeholder.com/300?text=No+Image';
    const price = product.price ? Number(product.price) : 0;
    const name = product.name || "Unknown Product";
    const description = product.description || "Fresh dairy product delivered daily.";

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: name,
            price: price,
            quantity: 1,
            image: imageUrl
        };

        addToCart(cartItem);

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // -----------------------------
    // SUBSCRIBE DAILY
    // -----------------------------
    const handleSubscribe = async () => {

        const quantity = prompt("Enter quantity in litres:");

        if (!quantity) return;

        const deliveryTime = prompt("Enter delivery time (Morning / Evening):");

        if (!deliveryTime) return;

        try {
            await API.post("/subscriptions/", {
                product: product.id,
                quantity_litres: quantity,
                delivery_time: deliveryTime,
                start_date: new Date().toISOString().split("T")[0],

            });

            alert("Subscription created successfully!");

        } catch (error) {
            console.error(error);
            alert("Failed to create subscription.");
        }
    };

    return (
        <div className="bg-[#2A0E30] rounded-2xl overflow-hidden border border-[#4F1C51] hover:border-[#DCA06D]/50 transition-all duration-300 group shadow-lg shadow-black/20 hover:shadow-[#DCA06D]/10 flex flex-col h-full">

            {/* Product Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-[#A55B4B] text-white text-xs font-bold px-2 py-1 rounded-md shadow flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    4.9
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">

                {/* Title + Price */}
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight truncate mr-2">
                        {name}
                    </h3>

                    <span className="text-[#DCA06D] font-black text-lg whitespace-nowrap">
                        ₹{price.toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
                    {description}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex flex-col gap-2">

                    {/* Add To Cart */}
                    <button
                        onClick={handleAddToCart}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 font-bold rounded-xl shadow-md transform active:scale-95 transition-all text-sm ${added
                            ? 'bg-green-600 hover:bg-green-500 text-white'
                            : 'bg-gradient-to-r from-[#DCA06D] to-[#A55B4B] hover:from-[#e3a876] hover:to-[#b36352] text-white'
                            }`}
                    >
                        {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                        {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>

                    {/* Subscribe */}
                    <button
                        onClick={handleSubscribe}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#4F1C51] hover:bg-[#3B1140] border border-[#A55B4B]/30 text-[#F5F5F5] font-semibold rounded-xl transition-all text-sm hover:border-[#DCA06D]"
                    >
                        <Calendar className="w-4 h-4 text-[#DCA06D]" />
                        Subscribe Daily
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;