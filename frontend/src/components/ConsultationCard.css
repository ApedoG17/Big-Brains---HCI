import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import "./ConsultationCard.css";

function ConsultationCard({ consultation }) {

  return (

    <article className="consultation-card">

      <div className="consultation-card-header">

        <div>

          <span className="consultation-label">
            ARCHIVERSE CONSULTATION
          </span>

          <h3>
            {consultation.architect || "Architect Consultation"}
          </h3>

        </div>


        <StatusBadge status={consultation.status} />

      </div>



      <div className="consultation-info">


        <div className="consultation-info-item">

          <span className="info-icon">📅</span>

          <div>
            <small>Date</small>
            <p>
              {consultation.date || "Not specified"}
            </p>
          </div>

        </div>




        <div className="consultation-info-item">

          <span className="info-icon">⏰</span>

          <div>
            <small>Time</small>
            <p>
              {consultation.time || "Not specified"}
            </p>
          </div>

        </div>




        <div className="consultation-info-item">

          <span className="info-icon">🏛️</span>

          <div>
            <small>Architect</small>
            <p>
              {consultation.architect || "Not specified"}
            </p>
          </div>

        </div>




        <div className="consultation-info-item">

          <span className="info-icon">💻</span>

          <div>
            <small>Meeting Type</small>
            <p>
              {consultation.type || "Not specified"}
            </p>
          </div>

        </div>


      </div>




      <Link
        to={`/consultations/${consultation.id}`}
        className="view-btn"
      >

        View Details
        <span>→</span>

      </Link>


    </article>

  );

}

export default ConsultationCard;