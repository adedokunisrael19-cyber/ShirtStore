const reviews = [
    {
        name: "Sarah M.",
        review:
            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
        name: "Alex K.",
        review:
            "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.",
    },
    {
        name: "James L.",
        review:
            "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is diverse and always on trend.",
    },
];

function Testimonials() {
    return (
        <section className="px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-3xl font-black md:text-4xl">
                        OUR HAPPY CUSTOMERS
                    </h2>

                    <div className="flex gap-3">
                        <button
                            className="text-2xl"
                            aria-label="Previous reviews"
                        >
                            ←
                        </button>

                        <button
                            className="text-2xl"
                            aria-label="Next reviews"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {reviews.map((review) => (
                        <article
                            key={review.name}
                            className="rounded-2xl border border-gray-200 p-6"
                        >
                            <div className="mb-4 text-yellow-400">
                                ★★★★★
                            </div>

                            <h3 className="mb-3 font-bold">
                                {review.name}
                                <span className="ml-2 text-green-500">
                                    ✓
                                </span>
                            </h3>

                            <p className="text-sm leading-6 text-gray-500">
                                "{review.review}"
                            </p>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Testimonials;