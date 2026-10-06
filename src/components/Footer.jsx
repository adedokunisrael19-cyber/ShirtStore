function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black">
                {title}
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">
                {links.map((link) => (
                    <li key={link}>
                        <a
                            href="#"
                            className="transition hover:text-black"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Footer() {
    return (
        <footer className="mt-10 bg-gray-100 px-6 pb-8 pt-12 md:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4 lg:grid-cols-5">

                {/* Brand */}
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-black">
                        SHIRTSTORE
                    </h2>

                    <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
                        Clothes that match your style and make you
                        confident every day.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm transition hover:bg-black hover:text-white"
                        >
                            𝕏
                        </a>

                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm transition hover:bg-black hover:text-white"
                        >
                            f
                        </a>

                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm transition hover:bg-black hover:text-white"
                        >
                            ◎
                        </a>
                    </div>
                </div>

                <FooterColumn
                    title="Company"
                    links={[
                        "About",
                        "Features",
                        "Works",
                        "Career",
                    ]}
                />

                <FooterColumn
                    title="Help"
                    links={[
                        "Customer Support",
                        "Delivery Details",
                        "Terms & Conditions",
                        "Privacy Policy",
                    ]}
                />

                <FooterColumn
                    title="FAQ"
                    links={[
                        "Account",
                        "Manage Deliveries",
                        "Orders",
                        "Payments",
                    ]}
                />

                <FooterColumn
                    title="Resources"
                    links={[
                        "Free eBooks",
                        "Development Tutorial",
                        "How to - Blog",
                        "YouTube Playlist",
                    ]}
                />

            </div>

            <div className="mx-auto mt-10 max-w-7xl border-t border-gray-300 pt-6 text-center text-xs text-gray-500">
                ShirtStore © 2026. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;