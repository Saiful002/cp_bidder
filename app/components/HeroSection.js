import Link from "next/link";
import Timer from "@/components/Timer";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white py-16 px-6 text-center h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{
          backgroundImage: "url('/path/to/your/background-image.jpg')",
        }}
      ></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 animate__animated animate__fadeInDown animate__delay-1s tracking-wide leading-snug">
          Welcome to <span className="text-teal-400">CP Clone</span>
        </h1>
        <p className="text-lg sm:text-xl mb-10 animate__animated animate__fadeInUp animate__delay-2s tracking-wide">
          Participate in exciting coding contests, improve your problem-solving
          skills, and connect with a global community of passionate programmers.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {/* Feature 1 */}
          <div className="bg-slate-100 text-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 animate__animated animate__fadeInUp animate__delay-3s">
            <div className="text-4xl text-teal-600 mb-4">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="font-semibold text-2xl mb-2">Competitive Contests</h3>
            <p className="text-gray-600">
              Test and enhance your coding skills with real-time challenges.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-100 text-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 animate__animated animate__fadeInUp animate__delay-4s">
            <div className="text-4xl text-teal-600 mb-4">
              <i className="fas fa-trophy"></i>
            </div>
            <h3 className="font-semibold text-2xl mb-2">Global Rankings</h3>
            <p className="text-gray-600">
              Compete with programmers worldwide and track your growth.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-100 text-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 animate__animated animate__fadeInUp animate__delay-5s">
            <div className="text-4xl text-teal-600 mb-4">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="font-semibold text-2xl mb-2">Team Challenges</h3>
            <p className="text-gray-600">
              Collaborate with teams to tackle complex coding problems.
            </p>
          </div>
        </div>

        {/* Button */}
        <Link
          href="/contest"
          className="inline-block bg-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg tracking-wide shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 animate__animated animate__fadeInUp animate__delay-6s"
        >
          Explore Contests
        </Link>
      </div>
    </section>
  );
}
