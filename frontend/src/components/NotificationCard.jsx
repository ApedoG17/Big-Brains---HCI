import { markNotificationRead } from "../services/notificationService";


function NotificationCard({ 
  id,
  title,
  message,
  time,
  unread,
  onRead
}) {


  async function handleRead(){


    try{

      await markNotificationRead(id);

      onRead(id);

    }


    catch(error){

      console.log(
        "Error marking notification as read:",
        error
      );

    }


  }



  return (

    <div className="card mb-3 p-3">


      <div className="d-flex justify-content-between">


        <div>

          <h5>
            {title}
          </h5>


          <p>
            {message}
          </p>


          <small>
            {time}
          </small>


        </div>



        {

          unread && (

            <button
              className="btn btn-primary"
              onClick={handleRead}
            >

              Mark Read

            </button>

          )

        }


      </div>


    </div>

  );

}


export default NotificationCard;