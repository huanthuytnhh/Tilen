// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-white text-black py-20 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-2xl font-bold mb-4">
              Ti<span className="font-normal text-gray-500">len</span>
            </div>
            <ul className="space-y-2">
              <li>+84 868280250</li>
              <li>Danang, Vietnam</li>
              <li>tilen@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-300"
                >
                  Cooperation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-300"
                >
                  Store
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-300"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-xl mb-4">Join our newsletter</h2>
            <p className="mb-4">Stay tuned for new product updates</p>
            <form action="/" className="flex">
              <input
                type="email"
                placeholder="Your email here"
                className="flex-1 p-2 rounded-l-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button className="bg-black text-white p-2 rounded-r-md hover:bg-gray-800 transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          Copyright © 2024 Tilen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
