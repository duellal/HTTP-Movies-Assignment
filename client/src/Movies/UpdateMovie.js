import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// Need to make an axios call to edit movies from api database
// Would like to make the stars list look like the other ones from the home screen
function UpdateMovie(props) {
   const [updateMovie, setUpdateMovie] = useState({})
   const { id } = useParams()
   const { push } = useHistory()

   useEffect(() => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then(res => {
            setUpdateMovie(res.data)
         })
         .catch(err => {
            console.log(err.response)
         })
   }, [])

   const handleChange = (e) => {
      e.preventDefault()

      if (e.target.name === 'metascore') {
         e.target.value = Math.max(100)
      }

      setUpdateMovie({
         ...updateMovie,
         [e.target.name]: e.target.value
      })
   }

   const saveMovie = (e) => {
      e.preventDefault()

      // Needs to be an axios call
      props.setMovieList({
         ...props.movies,
         [updateMovie.id]: updateMovie
      })

      push(`/movies/${id}`)
   };

   return (
      <div className="save-wrapper">
         <h2> Update Movie </h2>
         <form>
            <div className="movie-card">
               <h2>
                  <input
                     type='text'
                     name='title'
                     onChange={handleChange}
                     value={updateMovie.title}
                  />
               </h2>
               <div className="movie-director">
                  Director: <em>
                     <input
                        type='text'
                        name='director'
                        onChange={handleChange}
                        value={updateMovie.director}
                     />
                  </em>
               </div>
               <div className="movie-metascore">
                  Metascore: <strong>
                     <input
                        type='number'
                        name='metascore'
                        onChange={handleChange}
                        value={updateMovie.metascore}
                     />
                  </strong>
               </div>
               <h3>Actors</h3>

               {[updateMovie.stars].map(star => (
                  <div key={uuid()} className="movie-star">
                     {star}
                  </div>
               ))}
            </div>

            <button className='update-button' onClick={saveMovie}>
               Save Changes
            </button>
         </form>
      </div>
   )
}

export default UpdateMovie