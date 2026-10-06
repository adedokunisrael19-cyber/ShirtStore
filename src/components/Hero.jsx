
import heroImage from '../assets/bg img/Hero.jpg';


function Hero() {

    return (
        <section className="bg-gray-100">

            <div className="mx-auto grid max-w-7xl lg:grid-cols-2">

                <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:px-16">

                    <h1 className="max-w-2xl text-5xl font-black leading-[1] tracking-tight md:text-6xl">
                        FIND CLOTHES THAT MATCH YOUR STYLE
                    </h1>

                    <p className="mt-6 max-w-lg text-gray-600">
                        Discover shirts and styles made for everyday confidence.
                    </p>

                    <div>
                        <button className="mt-8 rounded-full bg-black px-8 py-3 text-white transition hover:bg-gray-800">
                            Shop Now
                        </button>
                    </div>

                    <div className="mt-12 grid grid-cols-3 gap-4">

                        <div>
                            <h2 className="text-2xl font-bold md:text-3xl">
                                200+
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 md:text-sm">
                                International Brands
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold md:text-3xl">
                                20,000+
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 md:text-sm">
                                High Quality Products
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold md:text-3xl">
                                30,000+
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 md:text-sm">
                                Happy Customers
                            </p>
                        </div>

                    </div>

                </div>

                <div className="w-full lg:h-[650px]">

                    <img
                        src={heroImage}
                        alt="Models wearing stylish clothing"
                        className="h-full w-full object-cover"
                    />

                </div>

            </div>

        </section>
    );
}

export default Hero;