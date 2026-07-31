import axiosClient from "./axiosClient";


export const consultationService = {



createConsultation: async (consultationData)=>{


const response = await axiosClient.post(

"/consultations/",

consultationData

);


return response.data;


},




getConsultations: async ()=>{


const response = await axiosClient.get(

"/consultations/"

);


return response.data;


},





getConsultationDetails: async(id)=>{


const response = await axiosClient.get(

`/consultations/${id}/`

);


return response.data;


},





cancelConsultation: async(id)=>{


const response = await axiosClient.patch(

`/consultations/${id}/cancel/`

);


return response.data;


}



};