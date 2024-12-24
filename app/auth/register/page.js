export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-700 via-sky-900 to-cyan-500">
      {/* Form Container */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md sm:w-3/4 lg:w-1/3">
        {/* Heading */}
        <h2 className="text-gray-100 text-2xl font-extrabold mb-4 text-center">
          Create an Account
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          Join us to start participating in contests and challenges.
        </p>

        {/* Form */}
        <form>
          {/* Username Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded shadow-lg hover:bg-teal-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          <span className="h-px w-full bg-gray-600"></span>
          <span className="text-gray-400 text-sm">Or</span>
          <span className="h-px w-full bg-gray-600"></span>
        </div>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-teal-300 hover:text-teal-500 transition duration-300"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
