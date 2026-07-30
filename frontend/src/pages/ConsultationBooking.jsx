import { useState } from "react";
import { consultationService } from "../api/consultationService";
import "./ConsultationBooking.css";


function ConsultationBooking() {

  const [formData, setFormData] = useState({
    architect: "",
    type: "Online Meeting",
    date: "",
    time: "",
    description: ""
  });


  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !formData.architect ||
      !formData.date ||
      !formData.time ||
      !formData.description
    ) {

      setMessage("Please complete all required fields.");

      return;

    }



    try {

      setLoading(true);
      setMessage("");

      await consultationService.createConsultation(formData);


      setMessage(
        "Your consultation request has been submitted successfully."
      );


      setFormData({

        architect:"",
        type:"Online Meeting",
        date:"",
        time:"",
        description:""

      });



    } catch(error){

      console.log(error);

      setMessage(
        "Unable to submit consultation request. Please try again."
      );


    }
    finally{

      setLoading(false);

    }


  };



  return (

    <div className="booking-page">


      <div className="booking-card">


        <div className="booking-title">


          <span>
            ARCHIVERSE CONSULTATION
          </span>


          <h1>
            Book Your Consultation
          </h1>


          <p>
            Meet experienced architects and bring your ideas to life.
          </p>


        </div>




        <form onSubmit={handleSubmit}>


          <label>
            Select Architect
          </label>


          <select
            name="architect"
            value={formData.architect}
            onChange={handleChange}
          >

            <option value="">
              Choose architect
            </option>

            <option value="Architect John">
              Architect John
            </option>


            <option value="Architect Sarah">
              Architect Sarah
            </option>


          </select>





          <label>
            Consultation Type
          </label>


          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >

            <option>
              Online Meeting
            </option>


            <option>
              Physical Meeting
            </option>


          </select>





          <div className="input-row">


            <div>

              <label>
                Date
              </label>


              <input

                type="date"

                name="date"

                value={formData.date}

                onChange={handleChange}

              />

            </div>




            <div>

              <label>
                Time
              </label>


              <input

                type="time"

                name="time"

                value={formData.time}

                onChange={handleChange}

              />

            </div>



          </div>





          <label>
            Project Description
          </label>


          <textarea

            name="description"

            placeholder="Describe your project..."

            value={formData.description}

            onChange={handleChange}

          />





          <button type="submit">

            {loading 
              ? "Submitting..."
              : "Book Consultation →"
            }

          </button>





          {
            message && (

              <p className="booking-message">
                {message}
              </p>

            )
          }




        </form>


      </div>


    </div>

  );

}


export default ConsultationBooking;