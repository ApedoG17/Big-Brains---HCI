import axiosClient from "./axiosClient";

export const consultationService = {
// Create a new consultation
createConsultation: async (consultationData) => {
const response = await axiosClient.post(
"/consultations/",
consultationData
);

```
return response.data;
```

},

// Get the current user's consultations
getConsultations: async () => {
const response = await axiosClient.get("/consultations/");

```
return response.data;
```

},

// Get details of one consultation
getConsultationDetails: async (id) => {
const response = await axiosClient.get(
`/consultations/${id}/`
);

```
return response.data;
```

},

// Cancel a consultation
cancelConsultation: async (id) => {
const response = await axiosClient.patch(
`/consultations/${id}/cancel/`
);

```
return response.data;
```

},
};