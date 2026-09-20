import{BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MyTeam from "./pages/Myteam";
import Register from "./pages/Register";

import ProtectedRoute from "./component/ProtectedRoute";
import Dashbord from "./pages/Dashbord";
import MyProfile from "./pages/Myprofile";
import Matches from "./pages/Matches";
import MyMatchs from "./pages/MyMatchs";
import CreateMatch from "./pages/CreateMatche";
import MatchDetails from "./pages/MatchDeatils";
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
        <Route path="/myteam" element={
            <ProtectedRoute>
              <MyTeam/>
            </ProtectedRoute>
        }/>
        <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <Matches/>
          </ProtectedRoute>
        }
        />
        <Route path="/matches/:id" element={
           <ProtectedRoute>
            <MatchDetails />
        </ProtectedRoute>
        }/>
      <Route path="/my-matches" element={
      <ProtectedRoute>
        <MyMatchs/>
      </ProtectedRoute>
      }/>
      <Route path="/Create-Match"
        element={
          <ProtectedRoute>
            <CreateMatch/>
          </ProtectedRoute>
        }
      />
      </Routes>
      
    </BrowserRouter>
}
export default App;
