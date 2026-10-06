import { useState } from 'react'
import { useSelector } from 'react-redux'
import CartDrawer from './CartDrawers';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [cartOpen, setCartOpen] = useState(false)

  const cartSlice = useSelector((state) => state.cart.items);

  const cartItems = useSelector((state)=> state.cart.items);

  const cartCount=  cartItems.reduce(
    (total, item) => total + item.quantity,0);


    
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-6 py-5">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl md:hidden" >
          ☰
        </button>
        <h1 className="text-2xl font-black">
          SHIRT STORE
        </h1>
        <div className="hidden gap-6 md:flex">
          <a href="#">Shop</a>
          <a href="#">On Sale</a>
          <a href="#">New Arrivals</a>
          <a href="#">Brands</a>
        </div>
        <div className="flex items-center gap-4">
          <input type="text" placeholder="Search for products..."
            className="hidden w-64 rounded-full bg-gray-100 px-4 py-2 text-sm outline-none lg:block"/>
          <button
              onClick={() => setCartOpen(true)}
              className="relative">
              🛒    {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                      {cartCount}
                  </span>
              )}
          </button>
          <button>👤</button>
        </div>

      </div>
      {menuOpen && (
        <div className="border-t px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#">Shop</a>
            <a href="#">On Sale</a>
            <a href="#">New Arrivals</a>
            <a href="#">Brands</a>
          </div>
        </div>
      )}

          <CartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
            />


    </nav>
  )
}
export default Navbar