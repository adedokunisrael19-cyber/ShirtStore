import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

function NewArrival (){
     const { products, loading, error } = useSelector(
        (state) => state.products
    );

    const [showAll, setShowAll] = useState(false);

    
    return(

        
      <section className="px-6 py-16 md:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-3xl font-black">
            NEW ARRIVALS
          </h2>


          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {loading && <p>Loading products...</p>}
            {error && <p>{error}</p>}

            {(showAll ? products : products.slice(0,4)).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}

          </div>


          <div className="mt-10 text-center">
            <button onClick={() => setShowAll(!showAll)} className="rounded-full border border-black px-8 py-3">
              {showAll ? 'Show Less' : 'View All'}
            </button>
          </div>

        </div>
        </section>
    

        )
}

export default NewArrival