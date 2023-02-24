import Root from "./pages/Root";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Folder from "./pages/Folder";
function App() {
  return (
    <Router>
      <header style={{display: "flex", justifyContent: "center"}}>
        <h1>Welcome to Folder Manager</h1>
      </header>
      <Routes>
        <Route path={"/"} element={<Root />}></Route>
        <Route path={"/folder/:id"} element={<Folder />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
