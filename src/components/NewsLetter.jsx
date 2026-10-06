import { useDispatch, useSelector } from "react-redux";
import {
    setEmail,
    subscribe,
} from "../store/newsletterSlice";

function Newsletter() {
    const dispatch = useDispatch();

    const { email, subscribed } = useSelector(
        (state) => state.newsletter
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email.trim() !== "") {
            dispatch(subscribe());
        }
    };

    return (
        <section className="px-6 py-10 md:px-10 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-black px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">

                <h2 className="max-w-xl text-2xl font-black uppercase leading-tight text-white md:text-3xl">
                    Stay up to date about our latest offers
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-md flex-col gap-3"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            dispatch(setEmail(event.target.value))
                        }
                        placeholder="Enter your email address"
                        className="rounded-full px-5 py-3 text-sm text-black outline-none"
                    />

                    <button
                        type="submit"
                        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
                    >
                        Subscribe to Newsletter
                    </button>

                    {subscribed && (
                        <p className="text-center text-sm text-green-400">
                            Thanks for subscribing!
                        </p>
                    )}
                </form>

            </div>
        </section>
    );
}

export default Newsletter;