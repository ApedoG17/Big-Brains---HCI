const API_URL = "http://localhost:5000";


export async function getMessages(){

    const response = await fetch(
        `${API_URL}/messages`
    );

    return response.json();

}



export async function getConversation(id){

    const response = await fetch(
        `${API_URL}/messages/${id}`
    );

    return response.json();

}



export async function sendMessage(messageData){

    const response = await fetch(
        `${API_URL}/messages`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(messageData)
        }
    );


    return response.json();

}