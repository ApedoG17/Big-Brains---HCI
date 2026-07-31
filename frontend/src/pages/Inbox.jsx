import { useEffect, useState } from "react";
import MessageCard from "../components/MessageCard";
import { getMessages } from "../services/messageService";
import "./Inbox.css";

function Inbox() {

  const [conversations, setConversations] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadMessages(){

      try {
const data = await getMessages();


if(data.length === 0){

  setConversations([

    {
      id: 1,
      name: "Kwame Architect",
      message: "Your blueprint has been reviewed.",
      time: "10:45 AM",
      unread: 2
    },

    {
      id: 2,
      name: "Project Admin",
      message: "Your consultation request was approved.",
      time: "Yesterday",
      unread: 1
    },

    {
      id: 3,
      name: "Ama Client",
      message: "Can we discuss the design changes?",
      time: "Monday",
      unread: 0
    }

  ]);

}
else{

  setConversations(data);

}

      } 
        
      catch(error){

        console.log("Error loading messages:", error);

         setConversations([

        {
          id: 1,
          name: "Kwame Architect",
          message: "Your blueprint has been reviewed.",
          time: "10:45 AM",
          unread: 2
        },

        {
          id: 2,
          name: "Project Admin",
          message: "Your consultation request was approved.",
          time: "Yesterday",
          unread: 1
        }

      ]);
      }


      finally {

        setLoading(false);

      }

    }


    loadMessages();

  }, []);



  if(loading){

    return (

      <div className="container mt-5">

        <h3>
          Loading messages...
        </h3>

      </div>

    );

  }



  return (

<div className="inbox-page">


<div className="inbox-header">

<h2>
Messages 💬
</h2>

<p>
Your conversations with clients and architects.
</p>

</div>



<div className="conversation-list">


{
conversations.length === 0 ? (

<div className="empty-message">

No conversations yet.

</div>


) : (


conversations.map((conversation,index)=>(

<MessageCard

key={index}

id={conversation.id}

name={conversation.name}

message={conversation.message}

time={conversation.time}

unread={conversation.unread}

/>

))


)

}


</div>


</div>

);

}


export default Inbox; 