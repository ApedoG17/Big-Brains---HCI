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


// Consultation pages
import ConsultationBooking from "./pages/ConsultationBooking";
import MyConsultations from "./pages/MyConsultations";
import ConsultationDetails from "./pages/ConsultationDetails";


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




{/* Consultation Module */}


<Route
path="/consultation/book"
element={<ConsultationBooking/>}
/>



<Route
path="/my-consultations"
element={<MyConsultations/>}
/>



<Route
path="/consultations/:id"
element={<ConsultationDetails/>}
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





<Route
path="/client-dashboard"
element={
<ProtectedRoute>
<ClientDashboard/>
</ProtectedRoute>
}
/>





<Route
path="/architect-dashboard"
element={
<ProtectedRoute>
<ArchitectDashboard/>
</ProtectedRoute>
}
/>





<Route
path="/admin-dashboard"
element={
<ProtectedRoute>
<AdminDashboard/>
</ProtectedRoute>
}
/>




</Routes>



<Footer/>


</BrowserRouter>


)


}



export default App;