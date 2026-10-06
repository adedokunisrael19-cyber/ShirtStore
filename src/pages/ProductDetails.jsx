import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
} from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import {
  decreaseDetailQuantity,
  increaseDetailQuantity,
  resetDetailSelection,
  setSelectedColor,
  setSelectedSize,
} from "../store/productDetailSlice";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";

function Stars({ rating = 0 }) {
  return (
    <span className="tracking-tight text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(Math.max(0, Math.round(rating)))}
      <span className="text-gray-300">
        {"★".repeat(Math.max(0, 5 - Math.round(rating)))}
      </span>
    </span>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const detail = useSelector((state) => state.productDetail);

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("reviews");
  const [sortNewest, setSortNewest] = useState(true);

  useEffect(() => {
    if (!products.length) dispatch(fetchProducts());
    dispatch(resetDetailSelection());
    setActiveImage(0);
  }, [dispatch, id]);

  const product = products.find((item) => String(item.id) === String(id));

  const images = useMemo(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.thumbnail];
  }, [product]);

  const reviews = useMemo(() => {
    const source = product?.reviews || [];
    return [...source].sort((a, b) => {
      if (!sortNewest) return (a.rating || 0) - (b.rating || 0);
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
  }, [product, sortNewest]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter(
      (item) => item.id !== product.id && item.category === product.category
    );
    const fallback = products.filter((item) => item.id !== product.id);
    return [...sameCategory, ...fallback].slice(0, 4);
  }, [product, products]);

  const colors = ["#34402d", "#111111", "#f4f4f4"];
  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        ...product,
        selectedColor: detail.selectedColor,
        selectedSize: detail.selectedSize,
        quantity: detail.quantity,
      })
    );
  };

  if (loading && !product) {
    return <div className="mx-auto max-w-7xl px-6 py-20 text-center">Loading product...</div>;
  }

  if (error) {
    return <div className="mx-auto max-w-7xl px-6 py-20 text-center text-red-600">{error}</div>;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-black">Product not found</h1>
        <Link to="/" className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-white">
          Back to Shop
        </Link>
      </div>
    );
  }

  const currentImage = images[activeImage] || product.thumbnail;
  const rating = product.rating || 0;
  const discount = product.discountPercentage || 0;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span>{product.category || "Shop"}</span>
          <span>/</span>
          <span className="truncate text-black">{product.title}</span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="grid grid-cols-[76px_1fr] gap-4 md:grid-cols-[100px_1fr]">
            <div className="flex flex-col gap-3">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded-xl border bg-gray-100 ${
                    activeImage === index ? "border-black" : "border-gray-200"
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="min-h-[360px] overflow-hidden rounded-2xl bg-[#f5f5f5] sm:min-h-[500px]">
              <img
                src={currentImage}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-black uppercase leading-tight md:text-4xl">
              {product.title}
            </h1>

            <div className="mt-3 flex items-center gap-3 text-sm">
              <Stars rating={rating} />
              <span className="font-medium">{rating.toFixed(1)}/5</span>
              <span className="text-gray-500">({product.reviews?.length || 0} Reviews)</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {discount > 0 && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  -{Math.round(discount)}%
                </span>
              )}
            </div>

            <p className="mt-5 border-b pb-6 text-sm leading-6 text-gray-600">
              {product.description}
            </p>

            <div className="border-b py-5">
              <p className="mb-3 text-sm font-medium text-gray-600">Select Color</p>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={color}
                    aria-label={`Color ${index + 1}`}
                    onClick={() => dispatch(setSelectedColor(color))}
                    style={{ backgroundColor: color }}
                    className={`h-9 w-9 rounded-full border-2 border-white ring-1 ${
                      detail.selectedColor === color ? "ring-black" : "ring-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="border-b py-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Choose Size</p>
                <span className="text-xs text-gray-400">Selected: {detail.selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => dispatch(setSelectedSize(size))}
                    className={`rounded-full px-5 py-2.5 text-sm ${
                      detail.selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <div className="flex items-center rounded-full bg-gray-100">
                <button
                  onClick={() => dispatch(decreaseDetailQuantity())}
                  className="px-4 py-3 text-lg"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-medium">{detail.quantity}</span>
                <button
                  onClick={() => dispatch(increaseDetailQuantity())}
                  className="px-4 py-3 text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="grid grid-cols-3 border-b text-center text-sm">
            {[
              ["details", "Product Details"],
              ["reviews", "Rating & Reviews"],
              ["faqs", "FAQs"],
            ].map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-2 py-4 font-medium ${
                  activeTab === tab ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="py-8 text-sm leading-7 text-gray-600">
              <p>{product.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <p><strong>Brand:</strong> {product.brand || "Shop.CO"}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock} available</p>
                <p><strong>Warranty:</strong> {product.warrantyInformation || "Standard warranty"}</p>
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-4 py-8">
              {[
                ["How long does delivery take?", product.shippingInformation || "Delivery details vary by location."],
                ["Can I return this product?", product.returnPolicy || "Please check our return policy."],
                ["Is this item in stock?", `${product.stock} units are currently available.`],
              ].map(([question, answer]) => (
                <div key={question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{question}</h3>
                  <p className="mt-2 text-sm text-gray-500">{answer}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="pt-7">
              <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-xl font-bold">
                  All Reviews <span className="text-sm font-normal text-gray-500">({reviews.length})</span>
                </h2>

                <button
                  onClick={() => setSortNewest((value) => !value)}
                  className="rounded-full border px-5 py-2 text-sm"
                >
                  {sortNewest ? "Newest" : "Rating"}
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {reviews.length ? reviews.map((review, index) => (
                  <article key={`${review.reviewerEmail}-${index}`} className="rounded-xl border p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <Stars rating={review.rating} />
                        <h3 className="mt-2 font-semibold">
                          {review.reviewerName || "Verified Customer"}
                          <span className="ml-2 text-xs text-green-600">✓ Verified</span>
                        </h3>
                      </div>
                      <span className="text-xs text-gray-400">
                        {review.date ? new Date(review.date).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">{review.comment}</p>
                  </article>
                )) : (
                  <p className="text-sm text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="mt-16">
          <h2 className="text-center text-2xl font-black uppercase md:text-3xl">
            You Might Also Like
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>

      <Newsletter />
      <Footer />
    </main>
  );
}

export default ProductDetails;
