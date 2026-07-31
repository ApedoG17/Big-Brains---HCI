import {useNavigate} from "react-router-dom";
import "./Dashboard.css";


function AdminDashboard(){

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
Welcome, Admin 👋
</h2>


<p>
Monitor and manage the platform.
</p>



<div className="cards">


<div className="card">

<h3>
Total Users
</h3>

<p>
250
</p>

</div>



<div className="card">

<h3>
Architects
</h3>

<p>
75
</p>

</div>



<div className="card">

<h3>
Clients
</h3>

<p>
175
</p>

</div>



<div className="card">

<h3>
Active Projects
</h3>

<p>
45
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
12
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
7
</p>

</div>


</div>




<div className="section-card">


<h2>
System Activity
</h2>


<div className="item">
New architect registered
</div>


<div className="item">
Project approved
</div>


<div className="item">
Blueprint uploaded
</div>



</div>




</div>


</div>


)

}


export default AdminDashboard;