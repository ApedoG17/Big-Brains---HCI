import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function ClientDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <h1>Client Dashboard</h1>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>


      <main className="dashboard-content">

        {/* Dashboard Widgets */}
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


          {/* Messages */}
          <div
            className="card clickable-card"
            onClick={() => navigate("/inbox")}
          >
            <h3>
              <span className="card-icon">💬</span>
              Messages
            </h3>
            <p>6</p>
          </div>


          {/* Notifications */}
          <div
            className="card clickable-card"
            onClick={() => navigate("/notifications")}
          >
            <h3>
              <span className="card-icon">🔔</span>
              Notifications
            </h3>
            <p>3</p>
          </div>

        </div>



        {/* Recent Projects */}
        <section className="dashboard-section">

          <div className="section-title">
            <h2>Recent Projects</h2>
          </div>


          <div className="section-card">

            <div className="item">

              <div className="project-details">

                <h3>
                  Modern Villa Design
                </h3>

                <p>
                  Status:
                  <span className="status">
                    Design Phase
                  </span>
                </p>


                <p>
                  Architect: Assigned Architect
                </p>

              </div>


              <button className="view-btn">
                View Project
              </button>


            </div>

          </div>

        </section>



        {/* Upcoming Meetings */}
        <section className="dashboard-section">

          <div className="section-title">

            <h2>
              Upcoming Meetings
            </h2>


            <button
              className="consultation-btn"
              onClick={() => navigate("/consultation-booking")}
            >
              Book Consultation
            </button>

          </div>



          <div className="section-card">


            <div className="meeting-item">

              <div>
                <h3>
                  Design Consultation
                </h3>

                <p>
                  With: Assigned Architect
                </p>
              </div>


              <div className="meeting-date">

                <strong>
                  12
                </strong>

                <span>
                  Aug
                </span>

              </div>

            </div>



            <div className="meeting-item">

              <div>

                <h3>
                  Project Review
                </h3>

                <p>
                  With: Assigned Architect
                </p>

              </div>


              <div className="meeting-date">

                <strong>
                  18
                </strong>

                <span>
                  Aug
                </span>

              </div>


            </div>


          </div>

        </section>




        {/* Recent Activity */}
        <section className="dashboard-section">


          <div className="section-title">

            <h2>
              Recent Activity
            </h2>

          </div>




          <div className="section-card activity-card">


            <div className="activity-item">

              <span className="activity-dot"></span>


              <div>

                <h3>
                  Blueprint updated
                </h3>

                <p>
                  Modern Villa Design
                </p>

              </div>


              <span className="activity-time">
                2 hours ago
              </span>


            </div>




            <div className="activity-item">

              <span className="activity-dot"></span>


              <div>

                <h3>
                  New message received
                </h3>

                <p>
                  Architect sent you a message.
                </p>

              </div>


              <span className="activity-time">
                Yesterday
              </span>


            </div>





            <div className="activity-item">

              <span className="activity-dot"></span>


              <div>

                <h3>
                  Consultation confirmed
                </h3>


                <p>
                  Your appointment has been confirmed.
                </p>

              </div>


              <span className="activity-time">
                2 days ago
              </span>


            </div>



          </div>


        </section>



      </main>


    </div>
  );
}

export default ClientDashboard;