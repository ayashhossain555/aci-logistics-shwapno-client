import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
