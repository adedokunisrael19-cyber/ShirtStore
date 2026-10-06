import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="min-w-0">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <h3 className="mt-4 line-clamp-2 font-bold">{product.title}</h3>

        <p className="mt-2 font-bold">${product.price}</p>
      </Link>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-4 w-full rounded-full bg-black px-5 py-3 text-white transition-all duration-200 hover:bg-gray-800 active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
