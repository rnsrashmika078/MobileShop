const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 bg-white shadow-xl rounded-2xl mt-10">
            <h1 className="text-4xl font-bold text-blue-700 border-b pb-2">
                About Us
            </h1>

            <div className="space-y-3 text-lg text-gray-700">
                <p>
                    Welcome to our local mobile accessory store based in{" "}
                    <strong>Atakalanpannn, Madampe, Ratnapura</strong>. We
                    specialize in providing high-quality{" "}
                    <span className="font-semibold text-blue-600">
                        phone backcovers
                    </span>
                    ,
                    <span className="font-semibold text-blue-600">
                        {" "}
                        chargers
                    </span>
                    , tempered glass, and other essential items for your daily
                    tech needs.
                </p>

                <p>
                    Our mission is to deliver durable, stylish, and affordable
                    accessories that protect and enhance your devices. Whether
                    you're looking for iPhone covers, Android accessories, or
                    chargers, we’ve got you covered with a wide selection.
                </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Contact Information
                </h2>

                <p>
                    <strong>Owner&apos;s Name:</strong> Gamini Siriwardhana
                </p>
                <p>
                    <strong>Contact Number:</strong>{" "}
                    <a
                        href="tel:+94716600777"
                        className="text-blue-600 hover:underline"
                    >
                        071 660 0777
                    </a>
                </p>

                <p>
                    <strong>Address:</strong> Atakalanpannn, Madampe, Ratnapura,
                    Sri Lanka
                </p>
            </div>

            <div className="flex gap-4 pt-4">
                <a
                    href="tel:+94723600777"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition"
                >
                    Call Now
                </a>
                <a
                    href={`https://wa.me/94723600777?text=${encodeURIComponent(
                        "Hi, I'm interested in your mobile accessories!"
                    )}`}
                    target="_blank"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition"
                >
                    WhatsApp Us
                </a>
            </div>
        </div>
    );
};

export default AboutPage;
