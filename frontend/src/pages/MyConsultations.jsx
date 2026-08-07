import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConsultationCard from "../components/ConsultationCard";
import { consultationService } from "../api/consultationService";
import "./MyConsultations.css";

function MyConsultations() {

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultations();
  }, []);


  const loadConsultations = async () => {

    try {

      setLoading(true);

      const data = await consultationService.getConsultations();


      const consultationList = Array.isArray(data)
        ? data
        : data?.results || [];


      setConsultations(consultationList);


    } catch (error) {

      console.error(
        "Failed to load consultations:",
        error
      );


      // If backend is unavailable,
      // show empty consultations instead of an error page
      setConsultations([]);


    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="consultations-page">


      <section className="consultations-hero">


        <div className="consultations-header">


          <span className="consultations-eyebrow">
            ARCHIVERSE · YOUR BOOKINGS
          </span>


          <h1>
            My Consultations
          </h1>


          <p>
            Keep track of your architecture consultations,
            appointment details, and booking status all in one place.
          </p>


        </div>



        <Link
          to="/consultation/book"
          className="new-consultation-btn"
        >

          Book a Consultation
          <span>→</span>

        </Link>


      </section>





      <section className="consultations-content">



        {loading && (

          <div className="consultations-state">


            <div className="loading-spinner"></div>


            <h2>
              Loading your consultations
            </h2>


            <p>
              We're retrieving your latest consultation requests.
            </p>


          </div>

        )}






        {!loading && consultations.length === 0 && (

          <div className="consultations-state empty-state">


            <div className="empty-icon">

              <span>
                📅
              </span>

            </div>



            <span className="empty-label">
              NO BOOKINGS YET
            </span>



            <h2>
              Your consultations will appear here
            </h2>



            <p>
              Once you book a consultation with an architect,
              your appointment details and status will automatically
              appear on this page.
            </p>




            <Link
              to="/consultation/book"
              className="empty-action"
            >

              Book Your First Consultation
              <span>→</span>

            </Link>



          </div>

        )}






        {!loading && consultations.length > 0 && (

          <>


            <div className="consultations-list-header">


              <div>


                <span>
                  YOUR APPOINTMENTS
                </span>



                <h2>
                  Upcoming & Recent Consultations
                </h2>


              </div>




              <div className="consultation-count">

                {consultations.length}{" "}

                {consultations.length === 1
                  ? "Consultation"
                  : "Consultations"
                }


              </div>


            </div>






            <div className="consultations-grid">


              {consultations.map((consultation) => (

                <ConsultationCard

                  key={consultation.id}

                  consultation={consultation}

                />

              ))}



            </div>



          </>

        )}



      </section>



    </main>

  );

}


export default MyConsultations;