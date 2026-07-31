import { useNavigate } from "react-router-dom";
import "./Dashboard.css";


function ClientDashboard(){

const navigate = useNavigate();


const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


return (

<div className="dashboard">

<header className="dashboard-header">

<h1>ArchiVerse</h1>

<button 
className="logout-btn"
onClick={handleLogout}>
Logout
</button>

</header>


<div className="dashboard-content">


<h2>Welcome, Client 👋</h2>

<p>
Manage your architectural projects and consultations.
</p>


<div className="cards">


<div className="card">
<h3>Active Projects</h3>
<p>3</p>
</div>


<div className="card">
<h3>Completed Projects</h3>
<p>5</p>
</div>


<div className="card">
<h3>Upcoming Meetings</h3>
<p>2</p>
</div>


<div 
  className="card"
  onClick={() => navigate("/inbox")}
  style={{cursor:"pointer"}}
>

<h3>
💬 Messages
</h3>

<p>
6
</p>

</div>

<div 
  className="card"
  onClick={() => navigate("/notifications")}
  style={{cursor:"pointer"}}
>

<h3>
🔔 Notifications
</h3>

<p>
3
</p>

</div>


</div>


<h2>Recent Projects</h2>


<div className="section-card">


<div className="item">


<h3>Modern Villa Design</h3>

<p>
Status: Design Phase
</p>

<p>
Architect: Assigned Architect
</p>
</div>

</div>


</div>


</div>

);

}


export default ClientDashboard;