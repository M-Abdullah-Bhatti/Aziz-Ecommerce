import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-5">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
          <h2
            className="text-2xl
            font-bold
            bg-clip-text
            md:text-left
            text-center
            text-transparent
            bg-gradient-to-r
            from-pink-700
            to-violet-700"
          >
            Next Commerce
          </h2>
        </div>

        <div className="w-full md:w-1/4 mb-4 md:mb-0 flex flex-col items-center ">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li>
              <Link className="text-gray-400 hover:text-white" href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="text-gray-400 hover:text-white" href="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="text-gray-400 hover:text-white" href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <ul>
            <li>
              <a
                href="https://www.facebook.com"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter for updates.
          </p>
          <input
            type="email"
            placeholder="Your Email"
            className="bg-gray-700 px-4 py-2 w-full rounded"
          />
          <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
