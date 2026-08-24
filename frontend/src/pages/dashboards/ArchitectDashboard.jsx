import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function ArchitectDashboard() {

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
      Welcome, Architect 👋
    </h2>

    <p>
      Manage your projects and client requests.
    </p>
  </div>


  <button
    className="logout-btn"
    onClick={logout}
  >
    Logout
  </button>

</div>




        {/* Cards */}
        <div className="cards">


          <div className="card">
            <h3>
              Assigned
              <br />
              Projects
            </h3>

            <p>6</p>
          </div>



          <div className="card">
            <h3>
              Pending
              <br />
              Requests
            </h3>

            <p>4</p>
          </div>




          <div className="card">
            <h3>
              Upcoming
              <br />
              Meetings
            </h3>

            <p>3</p>
          </div>




          <div className="card">
            <h3>
              Uploaded
              <br />
              Designs
            </h3>

            <p>12</p>
          </div>




          <div
            className="card clickable-card"
            onClick={() => navigate("/inbox")}
          >

            <h3>
              💬 Messages
            </h3>

            <p>
              8
            </p>

          </div>




          <div
            className="card clickable-card"
            onClick={() => navigate("/notifications")}
          >

            <h3>
              🔔 Notifications
            </h3>

            <p>
              4
            </p>

          </div>


        </div>


      </main>


    </div>

  );

}


export default ArchitectDashboard;