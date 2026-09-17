import{BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./component/ProtectedRoute";
import Dashbord from "./pages/Dashbord";
function App(){
    return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}  />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Dashbord" element={
            <ProtectedRoute>
              <Dashbord/>
            </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
}
export default App;
