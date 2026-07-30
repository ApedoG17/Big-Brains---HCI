import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";


function ConsultationCard({ consultation }) {

return (

<div className="consultation-card">


<div className="consultation-card-top">

<h3>
Architect Consultation
</h3>

<StatusBadge status={consultation.status}/>

</div>


<p>
📅 {consultation.date}
</p>


<p>
⏰ {consultation.time}
</p>


<p>
🏛️ {consultation.architect}
</p>


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