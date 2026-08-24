import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUnreadCount } from "../services/notificationService";


function NotificationDropdown() {

  const [open, setOpen] = useState(false);

  const [unreadCount, setUnreadCount] = useState(3);


  useEffect(() => {

    async function loadUnreadCount(){

      try {

        const data = await getUnreadCount();

        setUnreadCount(data.count);

      }

      catch(error){

        console.log("Using demo notification count");

      }

    }


    loadUnreadCount();

  }, []);



  return (

    <div style={{ position:"relative" }}>


      <button
        onClick={() => setOpen(!open)}
        style={{
          background:"none",
          border:"none",
          color:"white",
          fontSize:"20px",
          cursor:"pointer"
        }}
      >

        🔔

        {
          unreadCount > 0 && (

            <span
              style={{
                background:"red",
                color:"white",
                borderRadius:"50%",
                padding:"3px 7px",
                fontSize:"12px",
                marginLeft:"5px"
              }}
            >
              {unreadCount}
            </span>

          )
        }


      </button>



      {
        open && (

          <div
            style={{
              position:"absolute",
              right:0,
              top:"40px",
              width:"300px",
              background:"white",
              color:"black",
              padding:"15px",
              borderRadius:"8px",
              zIndex:1000
            }}
          >

            <div>
              <strong>
                New Message
              </strong>

              <p>
                You received a new message.
              </p>

              <small>
                2 mins ago
              </small>
            </div>


            <hr />


            <div>
              <strong>
                Consultation Approved
              </strong>

              <p>
                Your consultation was accepted.
              </p>

              <small>
                1 hour ago
              </small>
            </div>


            <hr />


            <div>
              <strong>
                Blueprint Uploaded
              </strong>

              <p>
                A new blueprint was uploaded.
              </p>

              <small>
                Yesterday
              </small>
            </div>


            <hr />


            <div style={{textAlign:"center"}}>

              <Link
                to="/notifications"
                style={{
                  color:"#2563eb",
                  fontWeight:"bold",
                  textDecoration:"none"
                }}
              >
                View All
              </Link>

            </div>


          </div>

        )

      }


    </div>

  );

}


export default NotificationDropdown;