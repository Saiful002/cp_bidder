"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the hook to check the current route

export default function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  // Check if the pathname matches the contest page pattern (e.g., /contest/[contestId])
  const isContestPage = pathname?.startsWith('/contest/');
  
  // Check if the current page is a specific problem page (e.g., /contest/[contestId]/[problemId])
  const isProblemPage = pathname?.match(/^\/contest\/\d+\/\d+$/);

  // Extract the contest base path (e.g., '/contest/[contestId]')
  const contestBasePath = isContestPage ? pathname.split('/').slice(0, 3).join('/') : '';

  // Hide Login and Register on contest and problem pages
  const hideAuthLinks = isContestPage || isProblemPage;

  // get data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const handle = user?.handle;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  }

  return (
    <nav className="bg-gray-900 border-b-2 border-cyan-500 text-white px-4 py-5 flex items-center">
      {/* Center the logo or title */}
      <div className="flex justify-center items-center w-full">
        <Link href="/" className="text-lg font-bold">CP Clone</Link>
      </div>


      {/* Conditionally render Login and Register links */}
      {!hideAuthLinks && !handle && (
        <div className="flex justify-center items-center space-x-3 w-full">
          <Link href={"/"} className="hover:underline hover:text-yellow-500 transition-colors">Home</Link>
          <Link href="../auth/login" className="hover:underline hover:text-yellow-500 transition-colors">Login</Link>
          <Link href="../auth/register" className="hover:underline hover:text-yellow-500 transition-colors">Register</Link>
        </div>
      )}

      {!hideAuthLinks && handle && ( // Conditionally render the user handle if available}
        <div className="flex justify-center items-center space-x-3 w-full">
          <Link href={"/"} className="hover:underline hover:text-yellow-500 transition-colors">Home</Link>
          <Link href={"/profile"} className="hover:underline hover:text-yellow-500 transition-colors capitalize">{handle}</Link>
          <button onClick={handleLogout} className="hover:underline hover:text-yellow-500 transition-colors">Logout</button>
        </div>
      )}

      {isContestPage && !isProblemPage && ( // Conditionally render contest-related links, but not for problem pages
        <div className="flex justify-center items-center space-x-3 w-full">
          <Link href={"/"} className="hover:underline">Home</Link>
          <Link href={`${contestBasePath}/problems`} className="hover:underline hover:text-yellow-500 transition-colors">Problems</Link>
          <Link href={`${contestBasePath}/ranking`} className="hover:underline hover:text-yellow-500 transition-colors">Ranking</Link>
          <Link href={`${contestBasePath}/teams`} className="hover:underline hover:text-yellow-500 transition-colors">Teams</Link>
          <Link href={`${contestBasePath}/vote`} className="hover:underline hover:text-yellow-500 transition-colors">Vote</Link>
        </div>
      )}

      {isProblemPage && ( // Conditionally render problem-specific links
        <div className="flex justify-center items-center space-x-3 w-full">
          <Link href={"/"} className="hover:underline">Home</Link>
          <Link href={`${pathname}/statement`} className="hover:underline hover:text-yellow-500 transition-colors">Statement</Link>
          <Link href={`${pathname}/submit`} className="hover:underline hover:text-green-500 transition-colors">Submit</Link>
          <Link href={`${contestBasePath}/ranking`} className="hover:underline hover:text-redyy-500 transition-colors">Ranking</Link>
        </div>
      )}
    </nav>
  );
}
