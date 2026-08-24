import "./StatusBadge.css";

function StatusBadge({ status }) {


  const currentStatus = status || "Pending";


  return (

    <span className={`status-badge ${currentStatus.toLowerCase()}`}>

      {currentStatus}

    </span>

  );

}


export default StatusBadge;