// src/components/Product.jsx
const Product = () => {
  return (
    <section className="py-20 px-4 bg-gray-100" id="product">
      <div className="container mx-auto">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">OUR PRODUCTS</h3>
        <h2 className="text-4xl font-bold mb-12 text-black">
          Elevate your gameplay with our cutting-edge controllers
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <ul className="space-y-4">
              <li className="flex items-center text-xl">
                <span className="text-black mr-2">▪</span> Standard Controllers
              </li>
              <li className="flex items-center text-xl">
                <span className="text-black mr-2">▪</span> Pro Controllers
              </li>
              <li className="flex items-center text-xl">
                <span className="text-black mr-2">▪</span> VR-Specific Controllers
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 text-center">
            <img
              src="/src/assets/image-removebg-preview (1).png"
              alt="product"
              className="mx-auto w-full max-w-md transform hover:scale-105 transition duration-300 filter hover:drop-shadow-2xl"
            />
            <p className="mt-6 text-xl text-gray-700 max-w-md mx-auto">
              Experience gaming like never before with advanced features that put
              you in complete control.
            </p>
            <button className="mt-8 bg-black text-white rounded-full px-8 py-3 font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105">
              All products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;