import {useNavigate} from "react-router-dom";
import "./Dashboard.css";


function ArchitectDashboard(){

const navigate=useNavigate();


const logout=()=>{

localStorage.removeItem("token");

navigate("/login");

};



return(

<div className="dashboard">


<header className="dashboard-header">

<h1>
ArchiVerse
</h1>


<button 
className="logout-btn"
onClick={logout}
>
Logout
</button>


</header>



<div className="dashboard-content">


<h2>
Welcome, Architect 👋
</h2>


<p>
Manage your projects and client requests.
</p>



<div className="cards">


<div className="card">

<h3>
Assigned Projects
</h3>

<p>
6
</p>

</div>



<div className="card">

<h3>
Pending Requests
</h3>

<p>
4
</p>

</div>



<div className="card">

<h3>
Upcoming Meetings
</h3>

<p>
3
</p>

</div>



<div className="card">

<h3>
Uploaded Designs
</h3>

<p>
12
</p>

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
8
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
4
</p>

</div>


</div>




<div className="section-card">


<h2>
Current Projects
</h2>


<div className="item">

<h3>
Residential Complex
</h3>

<p>
Client: Johnson Group
</p>

</div>



<div className="item">

<h3>
Commercial Building
</h3>

<p>
Client: ABC Company
</p>

</div>


</div>



</div>


</div>


)

}


export default ArchitectDashboard;