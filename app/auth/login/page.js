import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 via-teal-500 to-cyan-700">
      {/* Form Container */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md sm:w-3/4 lg:w-1/3">
        {/* Heading */}
        <h2 className="text-gray-100 text-2xl font-extrabold mb-4 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          Log in to continue to your account
        </p>

        {/* Form */}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded shadow-lg hover:bg-teal-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link
              href="../auth/forget-password"
              className="text-sm text-purple-300 hover:text-purple-500 transition duration-300"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          <span className="h-px w-full bg-gray-600"></span>
          <span className="text-gray-400 text-sm">Or</span>
          <span className="h-px w-full bg-gray-600"></span>
        </div>

        {/* Social Login Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="flex items-center gap-2 bg-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition duration-300">
            <i className="fab fa-google text-red-500"></i>
            <span className="text-gray-100">Login with Google</span>
          </button>
          <button className="flex items-center gap-2 bg-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition duration-300">
            <i className="fab fa-facebook text-blue-500"></i>
            <span className="text-gray-100">Login with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}
