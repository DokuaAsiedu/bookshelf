import { createContext, useContext, useEffect, useState } from "react";
import { checkImages } from "../utils/utils";
import noImage from "../assets/no-image.png"

const MyBookshelfContext = createContext([])

export function MyBookshelfProvider({children}) {
  const [bookmarks, setBookmarks] = useState([])
  const [bookcovers, setBookcovers] = useState([])

  const addBookmark = (book) => {
    console.log(book)
    const updatedBookmarks = [...bookmarks, book]
    setBookmarks(updatedBookmarks)
    window.localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
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
    <MyBookshelfContext.Provider value={{bookmarks, addBookmark, bookcovers}}>
      {children}
    </MyBookshelfContext.Provider>
  )
}

export function useMyBookshelfProvider() {
  return useContext(MyBookshelfContext)
}