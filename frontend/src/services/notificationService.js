const API_URL = "http://localhost:5000";


export async function getNotifications(){

    const response = await fetch(
        `${API_URL}/notifications`
    );


    return response.json();

}



export async function markNotificationRead(id){

    const response = await fetch(
        `${API_URL}/notifications/${id}/read`,
        {
            method:"PATCH"
        }
    );


    return response.json();

}



export async function getUnreadCount(){

    const response = await fetch(
        `${API_URL}/notifications/unread-count`
    );


    return response.json();

}