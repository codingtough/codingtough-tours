import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

function App() {

   const [loading, setLoading] = useState(true);
   const [tours, setTours] = useState([]);

   const fetchTours = async () => {
      setLoading(true);

      try {
         const response = await fetch(url);
         const tours = await response.json();
         setLoading(false);
         setTours(tours);

      } catch (error) {
         setLoading(false);
         console.log(error);
      }
   };

   const removeTour = id => {
      const newTours = tours.filter(tour => tour.id !== id);
      setTours(newTours);
   };

   useEffect(() => {
      fetchTours();
   }, []);

   if (loading) {
      return (
         <main>
            <Loading />
         </main>
      )
   }

   if (tours.length === 0) {
      return (
         <main>
            <section className="title">
               <h2>no tours left</h2>
               <button onClick={fetchTours} className="btn">refresh</button>
            </section>
         </main>
      )
   }

   return (
      <main>
         <Tours tours={tours} removeTour={removeTour} />
      </main>
   )
}

export default App;