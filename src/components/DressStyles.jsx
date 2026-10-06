const dressStyles = [
    {
        name: "Casual",
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    },
    {
        name: "Formal",
        image:
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
    },
    {
        name: "Party",
        image:
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80",
    },
    {
        name: "Gym",
        image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80",
    },
];

function DressStyles() {
    return (
        <section className="mx-auto mt-12 w-full max-w-7xl px-6">
            <div className="rounded-3xl bg-gray-100 px-6 py-10 md:px-10">
                
                <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-tight text-gray-900 md:text-4xl">
                    Browse by Dress Style
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {dressStyles.map((style) => (
                        <div
                            key={style.name}
                            className="group relative h-52 overflow-hidden rounded-2xl bg-white"
                        >
                            <img
                                src={style.image}
                                alt={style.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                            <div className="absolute left-6 top-5">
                                <h3 className="text-2xl font-semibold text-black">
                                    {style.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default DressStyles;