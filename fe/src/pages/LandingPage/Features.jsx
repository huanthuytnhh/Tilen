// src/components/Features.jsx
const Features = () => {
  const features = [
    {
      icon: '🎮',
      title: 'Real-Time Interaction',
      description: 'Engage with friends and opponents in real-time during gameplay.',
    },
    {
      icon: '🖥️',
      title: 'User-Friendly Interface',
      description: 'Navigate effortlessly with an intuitive design that enhances your experience.',
    },
    {
      icon: '💬',
      title: 'In-Game Chat',
      description: 'Communicate easily with friends and strategize your next move.',
    },
    {
      icon: '🏆',
      title: 'Competitive Play',
      description: 'Challenge your skills in exciting matches against other players.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">OUR FEATURES</h3>
        <h2 className="text-4xl font-bold mb-8 text-black">
          Interactive gameplay and user-friendly interface
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl">
          Tilen offers an engaging gaming experience with its interactive gameplay
          and user-friendly interface. Players can easily navigate the controls,
          ensuring seamless participation in exciting matches with friends while
          enjoying every moment of the game.
        </p>
        <button className="bg-black text-white rounded-full px-8 py-3 font-semibold hover:bg-gray-800 transition duration-300 mb-16 transform hover:scale-105">
          Explore more
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-200"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h4 className="text-xl font-semibold mb-3 text-black">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;