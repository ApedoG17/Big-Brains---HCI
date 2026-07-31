import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../services/notificationService";


function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadNotifications() {

      try {

        const data = await getNotifications();

        setNotifications(data);

      }

      catch(error) {

        console.log(
          "Error loading notifications:",
          error
        );

      }

      finally {

        setLoading(false);

      }

    }


    loadNotifications();


  }, []);




  function removeReadNotification(id) {

    setNotifications(

      notifications.map(notification =>

        notification.id === id

        ? {
            ...notification,
            unread:false
          }

        : notification

      )

    );

  }




  if(loading) {

    return (

      <div className="container mt-5">

        <h3>
          Loading notifications...
        </h3>

      </div>

    );

  }




  return (

    <div className="container mt-5">


      <h2 className="mb-4">
        Notifications
      </h2>



      {
        notifications.length === 0 ? (

          <p>
            No notifications available.
          </p>


        ) : (


          notifications.map((notification,index)=>(

            <NotificationCard

              key={index}

              id={notification.id}

              title={notification.title}

              message={notification.message}

              time={notification.time}

              unread={notification.unread}

              onRead={removeReadNotification}

            />


          ))

        )

      }



    </div>

  );

}


export default Notifications;