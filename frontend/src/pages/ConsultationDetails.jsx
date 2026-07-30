import { useParams, Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import "./ConsultationDetails.css";


function ConsultationDetails(){


const {id}=useParams();



const consultation={

id:id,

architect:"Architect John",

date:"2026-08-01",

time:"10:00 AM",

type:"Online Meeting",

status:"Confirmed",

description:
"Discussion about residential building design and planning."


};



return(


<div className="details-page">


<div className="details-card">


<div className="details-top">


<h1>
Consultation Details
</h1>


<StatusBadge status={consultation.status}/>


</div>




<div className="details-content">


<p>
🏛️ Architect:
<br/>
<strong>{consultation.architect}</strong>
</p>



<p>
📅 Date:
<br/>
<strong>{consultation.date}</strong>
</p>



<p>
⏰ Time:
<br/>
<strong>{consultation.time}</strong>
</p>



<p>
💻 Type:
<br/>
<strong>{consultation.type}</strong>
</p>




<p>
Project Description:
<br/>

<strong>
{consultation.description}
</strong>

</p>



</div>




<Link 
to="/my-consultations"
className="back-btn"
>

← Back To Consultations

</Link>



</div>


</div>


);


}


export default ConsultationDetails;