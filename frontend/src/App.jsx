import{BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./component/ProtectedRoute";
import Dashbord from "./pages/Dashbord";
import MyProfile from "./pages/Myprofile";
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
        <Route path="/Profile" element={
          <ProtectedRoute>
            <MyProfile/>
          </ProtectedRoute>
        }/>
        
      </Routes>
    </BrowserRouter>
}
export default App;
