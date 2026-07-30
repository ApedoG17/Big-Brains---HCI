import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import "./ConsultationCard.css";


function ConsultationCard({ consultation }) {


  return (

    <div className="consultation-card">


      <div className="consultation-card-header">


        <h3>
          Architect Consultation
        </h3>


        <StatusBadge status={consultation.status}/>


      </div>



      <div className="consultation-info">


        <p>
          📅 {consultation.date}
        </p>


        <p>
          ⏰ {consultation.time}
        </p>


        <p>
          🏛️ {consultation.architect}
        </p>


        <p>
          💻 {consultation.type}
        </p>


      </div>




      <Link 
        to={`/consultations/${consultation.id}`}
        className="view-btn"
      >

        View Details →

      </Link>



    </div>

  );

}


export default ConsultationCard;