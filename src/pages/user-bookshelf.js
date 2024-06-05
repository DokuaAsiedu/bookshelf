import { Booklist } from "../components"
import { GeneralLayout } from "../layouts/general-layout"
import { useMyBookshelfProvider } from "../providers/bookmarks-store"

export function UserBookShelf() {
  const { bookmarks, bookcovers } = useMyBookshelfProvider()

  return (
    <GeneralLayout>
      <h2 className="text-2xl text-center">My Bookmarks</h2>

      {bookmarks.length ? (
        <Booklist covers={bookcovers} books={bookmarks} canDelete={true} />
      ) : (
        <div>No books here!</div>
      )}
    </GeneralLayout>
  )
}
