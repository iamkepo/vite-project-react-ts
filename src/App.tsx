import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import EmptyLayout from "./layouts/EmptyLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import HomePage from "./pages/HomePage"
import NoMatch from "./pages/NoMatch"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route path=":lang/" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>     
         
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  )
}

export default App
