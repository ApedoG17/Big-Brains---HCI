import "./ChatBubble.css";


function ChatBubble({text, sender}) {


  return (

    <div
      className={`chat-bubble ${sender}`}
    >

      {text}

    </div>

  );

}


export default ChatBubble;