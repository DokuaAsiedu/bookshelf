export function BookTable({data}) {
  return (
    <table className="w-full table-fixed border-collapse border-spacing-2">
      <thead>
        <tr className="border-b-2 border-b-black">
          <td>Book Title</td>
          <td>Author Name</td>
          <td>Snippet</td>
          <td className="text-right">Rating</td>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => 
          <tr key={`item-${index}`} className="border-b-[1px] border-b-black whitespace-nowrap cursor-default">
            <td className="py-2 truncate" title={item.title}>{item.title}</td>
            <td className="py-2 truncate" title={item.author_name[0]}>{item.author_name[0]}</td>
            <td className="py-2 truncate text-right" title={item.first_sentence[0]}>{item.first_sentence ? item.first_sentence[0] : "-"}</td>
            <td className="py-2 truncate text-right" title={item.ratings_average}>{item.ratings_average.toFixed(1)}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}