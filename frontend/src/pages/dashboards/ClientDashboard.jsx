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

<button onClick={handleLogout}>
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


<div className="card">
<h3>Messages</h3>
<p>6</p>
</div>


</div>


<h2>Recent Projects</h2>


<div className="project">

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

);

}


export default ClientDashboard;