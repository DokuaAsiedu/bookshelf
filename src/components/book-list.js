import addIcon from "../assets/add.svg"
import trashIcon from "../assets/trash.svg"
import { useMyBookshelfProvider } from "../providers/bookmarks-store"

export function Booklist({ books, covers, canAdd, canDelete }) {
  const { addBookmark, deleteBookmark } = useMyBookshelfProvider()

  return (
    <div className="grid gap-4">
      {books.map((item, index) => {
        const {
          title,
          first_publish_year,
          first_sentence,
          ratings_average,
          author_name,
        } = item
        const rating = ratings_average
          ? ratings_average.toFixed(1)
          : "No rating yet"
        const authors = author_name
          .filter((name, index) => index <= 5)
          .join(", ")

        return (
          <div
            key={`item-${index}`}
            className="p-4 flex flex-col max-sm:items-center sm:flex-row gap-4 rounded-lg border-b-[1px] border-gray-300">
            <img
              src={covers[index]}
              alt="book cover"
              width={96}
              className="object-contain"
            />

            <div className="flex-1 flex flex-col gap-2">
              <p>
                <span className="font-bold">Title:</span> {title}
              </p>
              <p>
                <span className="font-bold">Author(s):</span> {authors}
              </p>
              <p>
                <span className="font-bold">First Published:</span>{" "}
                {first_publish_year}
              </p>
              <p>
                <span className="font-bold">Snippet:</span> {first_sentence}
              </p>
              <p>
                <span className="font-bold">Rating:</span> {rating}
              </p>

              {canAdd && (
                <button
                  className="flex justify-end gap-2 cursor-pointer"
                  onClick={() => addBookmark(item)}>
                  <span>Add to Bookshelf</span>

                  <img
                    title="Add to my bookshelf"
                    src={addIcon}
                    alt="add icon"
                    width={24}
                  />
                </button>
              )}

              {canDelete && (
                <button
                  className="flex justify-end gap-2 cursor-pointer"
                  onClick={() => deleteBookmark(item.key)}>
                  <span>Remove from Bookshelf</span>

                  <img
                    title="Remove from my bookshelf"
                    src={trashIcon}
                    alt="add icon"
                    width={24}
                  />
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
