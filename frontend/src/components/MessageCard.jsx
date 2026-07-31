import { Link } from "react-router-dom";


function MessageCard({id,name,message,time,unread}){


return(

<Link 
to={`/conversation/${id}`}
style={{textDecoration:"none",color:"inherit"}}
>


<div className="message-card">


<div className="message-info">

<h3>
{name}
</h3>


<p className="message-preview">
{message}
</p>


</div>



<div>


<p className="message-time">
{time}
</p>


{
unread > 0 && (

<span className="unread-badge">

{unread} new

</span>

)

}


</div>



</div>


</Link>


);


}


export default MessageCard;