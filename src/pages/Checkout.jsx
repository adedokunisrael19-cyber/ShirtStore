// import { useSelector } from 'react-redux';
// import { useState } from 'react';

// function Checkout() {
//     const cartItems = useSelector((state) => state.cart.items);

//     const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     address: '',
//     city: '',
//     phone: '',
// });

// const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData({
//         ...formData,
//         [name]: value,
//     });
// };

// const handleSubmit = (event) => {
//     event.preventDefault();

//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//         newErrors.fullName = 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//         newErrors.email = 'Email is required';
//     }

//     if (!formData.address.trim()) {
//         newErrors.address = 'Address is required';
//     }

//     if (!formData.city.trim()) {
//         newErrors.city = 'City is required';
//     }

//     if (!formData.phone.trim()) {
//         newErrors.phone = 'Phone number is required';
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//         console.log('Order ready:', formData);
//     }
// };

//     const cartTotal = cartItems.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     return (
//         <div className="mx-auto max-w-6xl px-6 py-12">
//             <h1 className="text-3xl font-bold">
//                 Checkout
//             </h1>

//             <div className="mt-10 grid gap-10 lg:grid-cols-2">
//                 <div>
//                     <h2 className="text-xl font-bold">
//                         Customer Information
//                     </h2>

//                     <div className="mt-6 space-y-4">
//                     <input
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             placeholder="Full Name"
//                             className="w-full rounded-lg border px-4 py-3 outline-none"
//                         />

//                        <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Email Address"
//                             className="w-full rounded-lg border px-4 py-3 outline-none"
//                         />

//                        <input
//                             type="text"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             placeholder="Address"
//                             className="w-full rounded-lg border px-4 py-3 outline-none"
//                         />

//                         <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             placeholder="City"
//                             className="w-full rounded-lg border px-4 py-3 outline-none"
//                         />

//                         <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="Phone Number"
//                             className="w-full rounded-lg border px-4 py-3 outline-none"
//                         />
//                         </div>
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-bold">
//                         Order Summary
//                     </h2>

//                     <div className="mt-6 space-y-4">
//                         {cartItems.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="flex items-center justify-between" >
//                                 <div>
//                                     <p className="font-medium">
//                                         {item.title}
//                                     </p>

//                                     <p className="text-sm text-gray-500">
//                                         Qty: {item.quantity}
//                                     </p>
//                                 </div>

//                                 <p className="font-semibold">
//                                     ${(item.price * item.quantity).toFixed(2)}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="mt-8 border-t pt-6">
//                         <div className="flex justify-between text-xl font-bold">
//                             <span>Total</span>
//                             <span>
//                                 ${cartTotal.toFixed(2)}
//                             </span>
//                         </div>

//                         <button className="mt-6 w-full rounded-full bg-black px-6 py-3 font-semibold text-white">
//                             Place Order
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Checkout;


import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';

function Checkout() {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);

        // Only place the order when there are no errors
        if (Object.keys(newErrors).length === 0) {
            console.log('Order ready:', formData);

            // Clear the cart
            dispatch(clearCart());

            // Show success page
            setOrderPlaced(true);
        }
    };

    // Show this after a successful order
    if (orderPlaced) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
                    ✓
                </div>

                <h1 className="mt-6 text-4xl font-bold">
                    Order Placed Successfully!
                </h1>

                <p className="mt-4 text-gray-500">
                    Thank you for your order, {formData.fullName}.
                </p>

                <p className="mt-2 text-gray-500">
                    We will contact you shortly with your order details.
                </p>

                <button
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    className="mt-8 rounded-full bg-black px-8 py-3 font-semibold text-white hover:bg-gray-800"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-12">

            {/* Page Heading */}
            <div>
                <h1 className="text-3xl font-bold">
                    Checkout
                </h1>

                <p className="mt-2 text-gray-500">
                    Complete your information to place your order.
                </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">

                {/* Customer Information */}
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold">
                        Customer Information
                    </h2>

                    <div className="mt-6 space-y-5">

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="mb-2 block text-sm font-medium"
                            >
                                Full Name
                            </label>

                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                            />

                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="address"
                                className="mb-2 block text-sm font-medium"
                            >
                                Address
                            </label>

                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                            />

                            {errors.address && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <label
                                htmlFor="city"
                                className="mb-2 block text-sm font-medium"
                            >
                                City
                            </label>

                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                            />

                            {errors.city && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium"
                            >
                                Phone Number
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                            />

                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                    </div>
                </form>

                {/* Order Summary */}
                <div>
                    <h2 className="text-xl font-bold">
                        Order Summary
                    </h2>

                    <div className="mt-6 space-y-5">

                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">
                                Your cart is empty.
                            </p>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b pb-5"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="h-20 w-20 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>

                                        <p className="mt-2 font-semibold">
                                            $
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>

                    {/* Total */}
                    <div className="mt-8 border-t pt-6">

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>

                            <span>
                                ${cartTotal.toFixed(2)}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={cartItems.length === 0}
                            className="mt-6 w-full rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            Place Order
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}
export default Checkout;