import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";

import { getConversation } from "../services/messageService";
import "./Conversation.css";

function Conversation() {


  const navigate = useNavigate();

  const { id } = useParams();


  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    async function loadConversation(){


      try {


        const data = await getConversation(id);


        setMessages(data);


      }


      catch(error){


        console.log(
          "Error loading conversation:",
          error
        );


        // temporary demo messages

        setMessages([

          {
            text:"Hello, your blueprint has been reviewed.",
            sender:"them"
          },

          {
            text:"Thank you, I will check it.",
            sender:"me"
          }

        ]);


      }


      finally {


        setLoading(false);


      }


    }



    loadConversation();


  }, [id]);





  if(loading){


    return (

      <div className="container mt-5">

        <h3>
          Loading conversation...
        </h3>

      </div>

    );

  }





  return (

    <div className="conversation-page">


     <div className="conversation-header">


        <button
  className="back-btn"
  onClick={() => navigate("/inbox")}
>
  ← Back to Inbox
</button>



        <h2 className="mb-0">

          Conversation

        </h2>


      </div>



      <hr />



      <div className="chat-box">

      <div className="chat-container"></div>


        {
          messages.length === 0 ? (

            <p>
              No messages yet.
            </p>


          ) : (


            messages.map((message,index)=>(

              <ChatBubble

                key={index}

                text={message.text}

                sender={message.sender}

              />

            ))


          )

        }


      </div>



      <MessageInput setMessages={setMessages} />


    </div>

  );

}


export default Conversation;