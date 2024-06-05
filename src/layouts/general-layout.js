import { Navbar } from "../components"

export function GeneralLayout({ children }) {
  return (
    <div className="container py-4 min-h-screen flex flex-col gap-4 bg-white">
      <Navbar />

      {children}
    </div>
  )
}
