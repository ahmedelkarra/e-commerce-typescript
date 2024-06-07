import heroImage from '../assets/e-commerce.jpg'

function HeroSection() {
    return (
        <section>
            <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                    <div className="relative z-10 lg:py-16">
                        <div className="relative h-64 sm:h-80 lg:h-full">
                            <img
                                alt="hero-image"
                                src={heroImage}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center bg-gray-100">
                        <span
                            className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
                        ></span>

                        <div className="p-8 sm:p-16 lg:p-24">
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Welcome to E-Commerce,
                            </h2>

                            <p className="mt-4 text-gray-600">
                                your ultimate destination for online shopping! Our platform offers a wide range of products from the latest fashion trends to cutting-edge electronics, all at your fingertips. With secure payments, fast delivery, and top-notch customer service, we aim to provide you with a seamless and enjoyable shopping experience. Join our community today and discover the convenience and variety that [Website Name] has to offer!
                            </p>

                            <a
                                href="#"
                                className="mt-8 inline-block rounded border border-indigo-300 bg-buttonColor px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection