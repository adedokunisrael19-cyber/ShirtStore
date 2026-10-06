
import heroImage from '../assets/bg img/Hero.jpg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/productSlice'
import ProductCard from '../components/ProductCard'
import DressStyles from '../components/DressStyles'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/Footer'
import NewArrival from '../components/NewArrivals'
import Hero from '../components/Hero'

function Home() {
  const dispatch = useDispatch();

  const { products, loading, error} = 
      useSelector((state)=> state.products);

  useEffect(()=> {dispatch(fetchProducts());}, [dispatch]);

  const [showAll, setShowAll] = useState(false)


  return (
    <main>

    
      <Hero/>
      <NewArrival/>
      <DressStyles/>
      <Testimonials/>
      <Newsletter/>
      <Footer/>


    </main>
  )
}

export default Home
