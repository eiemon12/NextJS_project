
import Sidebar from "../components/sidebar";


export default function customerSupportLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
