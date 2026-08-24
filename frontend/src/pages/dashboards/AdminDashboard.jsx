import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (

    <div className="dashboard">


      <main className="dashboard-content">


        {/* Welcome Section */}
        <div className="welcome-section">


          <div>

            <h2>
              Welcome, Admin 👋
            </h2>


            <p>
              Manage users, projects and system activities.
            </p>

          </div>



          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>


        </div>





        {/* Dashboard Cards */}
        <div className="cards">


          <div className="card">

            <h3>
              Total Users
            </h3>

            <p>
              25
            </p>

          </div>




          <div className="card">

            <h3>
              Active Projects
            </h3>

            <p>
              10
            </p>

          </div>




          <div className="card">

            <h3>
              Architects
            </h3>

            <p>
              8
            </p>

          </div>




          <div className="card">

            <h3>
              Clients
            </h3>

            <p>
              17
            </p>

          </div>




          {/* Messages */}
          <div
            className="card clickable-card"
            onClick={() => navigate("/inbox")}
          >

            <h3>
              💬 Messages
            </h3>

            <p>
              12
            </p>

          </div>




          {/* Notifications */}
          <div
            className="card clickable-card"
            onClick={() => navigate("/notifications")}
          >

            <h3>
              🔔 Notifications
            </h3>

            <p>
              5
            </p>

          </div>



        </div>


      </main>


    </div>

  );

}


export default AdminDashboard;