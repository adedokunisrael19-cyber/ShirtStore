import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity,decreaseQuantity,removeFromCart} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";




function CartDrawer({ isOpen, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const cartItems = useSelector((state)=> state.cart.items);
    const cartTotal = cartItems.reduce((total, item)=> total + item.price * item.quantity, 0)
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
});
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };


    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50"> 
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40"/>

           
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">  Your Cart </h2>

                    <button onClick={onClose} className="text-2xl" > × </button>
                </div>

                <div className="mt-8"> {cartItems.length === 0 ? (<p className="text-gray-500"> Your cart is empty. </p>) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4" >
                                    <img src={item.thumbnail} alt={item.title} className="h-20 w-20 rounded-lg object-cover" />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-gray-600">
                                            ${item.price}
                                        </p>

                                        <div className="mt-2 flex items-center gap-3">
                                        <button onClick={() => dispatch(decreaseQuantity(item.id))}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border">− </button>
                                        <span className="text-sm font-medium"> {item.quantity} </span>

                                        <button
                                            onClick={() => dispatch(increaseQuantity(item.id))}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border"> + </button>
                                    </div>
                                    <p className="mt-2 font-semibold">
                                        Sub-total - ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                     <button onClick={() => dispatch(removeFromCart(item.id))}
                                            className="mt-2 text-sm text-red-500 hover:underline"> Remove </button>
                                    </div>
                                    
                                </div>
                            ))}

                            {cartItems.length > 0 && (
                            <div className="mt-8 border-t pt-6">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>

                               <button onClick={() => { onClose(); navigate('/checkout'); }}
                                    className="mt-6 w-full rounded-full bg-black px-6 py-3 font-semibold text-white" >
                                    Checkout
                                </button>
                            </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
export default CartDrawer;