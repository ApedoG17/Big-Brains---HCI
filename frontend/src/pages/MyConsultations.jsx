import { useEffect, useState } from "react";
import ConsultationCard from "../components/ConsultationCard";
import { consultationService } from "../api/consultationService";
import "./MyConsultations.css";


function MyConsultations(){


const [consultations,setConsultations]=useState([]);

const [loading,setLoading]=useState(true);



useEffect(()=>{


loadConsultations();


},[]);



const loadConsultations=async()=>{


try{


const data = await consultationService.getConsultations();

setConsultations(data);



}

catch(error){


console.log(error);



setConsultations([

{
id:1,
architect:"Architect John",
date:"2026-08-01",
time:"10:00",
type:"Online Meeting",
status:"Pending"
},

{
id:2,
architect:"Architect Sarah",
date:"2026-08-05",
time:"14:00",
type:"Physical Meeting",
status:"Confirmed"
}

]);


}

finally{

setLoading(false);

}


};



return(


<div className="consultations-page">


<div className="consultations-header">


<span>
MY CONSULTATIONS
</span>


<h1>
Your Architecture Meetings
</h1>


<p>
Track all your consultation requests and appointment status.
</p>


</div>



{
loading ?

<h2>
Loading consultations...
</h2>


:


<div className="consultations-grid">


{
consultations.map((item)=>(


<ConsultationCard

key={item.id}

consultation={item}

/>


))

}



</div>


}



</div>


);


}


export default MyConsultations;