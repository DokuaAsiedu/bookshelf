import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, UserBookShelf } from "./pages";
import { MyBookshelfProvider } from "./providers/bookmarks-store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/user-bookshelf",
    element: <UserBookShelf/>,
  },
]);

function App() {
  return (
    <MyBookshelfProvider>
      <RouterProvider router={router} />
    </MyBookshelfProvider>
  )
}

export default App;
