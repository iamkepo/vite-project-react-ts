import { Route, HashRouter as Router, Routes } from "react-router-dom"
import EmptyLayout from "./layouts/EmptyLayout"
// import DashboardLayout from "./layouts/DashboardLayout"
import HomeView from "./views/HomeView"
import { NoMatch } from "./views/NoMatch"

function App(): JSX.Element {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<HomeView />} />
          {/* <Route path="dashboard/" element={<DashboardLayout />}>
          </Route> */}

          <Route path='*' element={<NoMatch />} />
        </Route>      
      </Routes>
    </Router>
  )
}

export default App
