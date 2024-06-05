import { useEffect, useState } from "react"
import { Booklist } from "../components"
import Spinner from "../assets/spinner.svg"
import NoImage from "../assets/no-image.png"
import CancelIcon from "../assets/cancel.svg"
import { GeneralLayout } from "../layouts/general-layout"
import { checkImages } from "../utils/utils"

export function Home() {
  const [query, setQuery] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [searchResCovers, setSearchResCovers] = useState([])
  const [loading, setLoading] = useState(false)

  const handleQuery = (e) => {
    const val = e.target.value
    // console.log(val)
    setQuery(val)

    if (val.length) {
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }

  const search = async () => {
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)

    res
    .json()
    .then(response => {
      setLoading(false)
      // console.log(response)
      setSearchRes(response.docs)
    }).catch(err => {
      setLoading(false)
      // console.log(err)
    })
  }

  useEffect(() => {
    if (query.length) {
      const timeoutId = setTimeout(search, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [query])

  useEffect(() => {
    const imageUrls = searchRes.map(item => {
      if (item.isbn && item.isbn.length) {
        return `https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-M.jpg`
      }
      else {
        return ""
      }
    })
    // console.log(imageUrls)
    if (searchRes.length) {
      Promise.all(checkImages(imageUrls))
      .then(pass => {
        setSearchResCovers(pass.map(elem => {
          if (elem.status) {
            return elem.url
          }
          else {
            return NoImage
          }
        }))
      })
    }
  }, [searchRes])

  return (
    <GeneralLayout>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label htmlFor="query">Search for a book:</label>

        <div className="flex-1 flex items-stretch gap-2 border-[1px] border-black rounded-md overflow-hidden">
          <input id="query" type="text" placeholder="Enter book name..." className="flex-1 p-2 outline-none bg-transparent" value={query} onChange={handleQuery}/>

          <button onClick={() => setQuery("")} className="p-2 bg-transparent">
            <img src={CancelIcon} alt="clear text button" width={16}/>
          </button>
        </div>
        
      </div>

      {loading ?
        <div className="grid place-items-center">
          <img src={Spinner} alt="spinner icon" width={48} className="animate-spin" />
          <span>Searching...</span>
        </div> :

        <div>
          {query.length > 0 &&
              <>
                {searchRes.length ?
                  <Booklist books={searchRes} covers={searchResCovers} canAdd={true}/> :
                  <p className="text-center">No results match your query</p>
                }
              </>
          }
        </div>
      }
    </GeneralLayout>

  );
}