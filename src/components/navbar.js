import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <Link to="/">
        <h1 className="text-3xl text-center">Books</h1>
      </Link>
      
      <Link to="/user-bookshelf" className="p-2 bg-blue-200 rounded-md">My Bookshelf</Link>
    </div>
  )
}