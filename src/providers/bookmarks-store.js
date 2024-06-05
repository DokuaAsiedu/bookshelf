import { createContext, useContext, useEffect, useState } from "react";
import { checkImages } from "../utils/utils";
import noImage from "../assets/no-image.png"
import toastr from "toastr";

const MyBookshelfContext = createContext([])

export function MyBookshelfProvider({children}) {
  const [bookmarks, setBookmarks] = useState([])
  const [bookcovers, setBookcovers] = useState([])

  const addBookmark = (book) => {
    // console.log(book)
    const isBookInShelf = bookmarks.find(item => item.key === book.key)

    if (isBookInShelf) {
      toastr.error(`You have already added ${book.title} to your bookshelf`)
      return
    }
    const updatedBookmarks = [...bookmarks, book]
    setBookmarks(updatedBookmarks)
    window.localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    toastr.success(`Successfully added ${book.title} to your bookshelf`)
  }

  const deleteBookmark = (book_key) => {
    const book = bookmarks.find(item => item.key === book_key)

    if (book) {
      const newBookmarks = bookmarks.filter(item => item.key !== book_key)
      setBookmarks(newBookmarks)
      window.localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
      toastr.success(`Removed ${book.title} from your bookshelf`)
    }
    else {
      toastr.error("Sorry, something went wrong. Please try again later.")
    }
  }

  useEffect(() => {
    const storage = window.localStorage.getItem('bookmarks')
    
    if (storage) {
      setBookmarks(JSON.parse(storage))
    }
    else {
      window.localStorage.setItem('bookmarks', bookmarks)
    }
  }, [])

  useEffect(() => {
    if (bookmarks.length) {
      Promise.all(checkImages(bookmarks.map(item => `https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-M.jpg`)))
      .then(pass => {
        setBookcovers(pass.map(elem => {
          if (elem.status) {
            return elem.url
          }
          else {
            return noImage
          }
        }))
      })
    }
  }, [bookmarks])

  return (
    <MyBookshelfContext.Provider value={{bookmarks, addBookmark, bookcovers, deleteBookmark}}>
      {children}
    </MyBookshelfContext.Provider>
  )
}

export function useMyBookshelfProvider() {
  return useContext(MyBookshelfContext)
}