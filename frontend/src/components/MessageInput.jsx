import { useState } from "react";
import { sendMessage } from "../services/messageService";


function MessageInput({ setMessages }) {


  const [message, setMessage] = useState("");



  async function handleSend(){


    if(message.trim() === ""){

      return;

    }



    const newMessage = {

      text: message,

      sender: "me"

    };



    // Show immediately on screen

    setMessages(previous => [

      ...previous,

      newMessage

    ]);



    try{


      await sendMessage({

        content: message,

        receiverId: 1

      });


    }


    catch(error){


      console.log(
        "Message sending failed:",
        error
      );


    }



    setMessage("");


  }




  return (

    <div className="message-input">


      <input

        type="text"

        className="chat-input"

        placeholder="Type your message..."

        value={message}

        onChange={(e)=>setMessage(e.target.value)}

      />



      <button

        className="send-btn"

        onClick={handleSend}

      >

        Send

      </button>


    </div>

  );

}


export default MessageInput;