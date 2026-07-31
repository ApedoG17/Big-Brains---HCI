import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Architects from "./pages/Architects";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Inbox from "./pages/Inbox";
import Conversation from "./pages/Conversation";
import Notifications from "./pages/Notifications";

import ClientDashboard from "./pages/dashboards/ClientDashboard";
import ArchitectDashboard from "./pages/dashboards/ArchitectDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

import ProtectedRoute from "./auth/ProtectedRoute";

function App(){

return(

<BrowserRouter>

<Navbar/>


<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/about" element={<About/>}/>

<Route path="/services" element={<Services/>}/>

<Route path="/architects" element={<Architects/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route
  path="/client-dashboard"
  element={
    <ProtectedRoute>
      <ClientDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/architect-dashboard"
  element={
    <ProtectedRoute>
      <ArchitectDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route path="/inbox" element={<Inbox />} />

<Route path="/conversation/:id" element={<Conversation />} />

<Route path="/notifications" element={<Notifications />} />

<Route 
  path="/inbox" 
  element={<Inbox />} 
/>


<Route 
  path="/conversation/:id" 
  element={<Conversation />} 
/>


<Route 
  path="/notifications" 
  element={<Notifications />} 
/>


</Routes>


<Footer/>


</BrowserRouter>

)

}


export default App;