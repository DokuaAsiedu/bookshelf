import { useEffect, useState } from "react";
import Spinner from "./assets/spinner.svg"
import { BookTable } from "./components/book-table";

function App() {
  const [query, setQuery] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [loading, setLoading] = useState(false)

  const handleQuery = (e) => {
    const val = e.target.value
    console.log(val)
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
      console.log(response)
      setSearchRes(response.docs)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
    const timeoutId = setTimeout(search, 500)
    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="container py-4 min-h-screen flex flex-col gap-4 bg-white">
      <h1 className="text-3xl text-center">Bookshelf</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label htmlFor="query">Search for a book:</label>
        <input id="query" type="text" placeholder="Enter book name..." className="flex-1 p-2 outline-none border-[1px] border-black rounded-md" value={query} onChange={handleQuery}/>
      </div>

      {loading ?
        <div className="grid place-items-center">
          <img src={Spinner} alt="spinner icon" width={48} className="animate-spin" />
          <span>Searching...</span>
        </div> :

        <div className="">
          {query.length > 0 &&
              <>
                {searchRes.length ?
                  <BookTable data={searchRes}/>
                  :
                  <p className="text-center">No results match your query</p>
                }
              </>
          }
        </div>
      }
    </div>

  );
}

export default App;
