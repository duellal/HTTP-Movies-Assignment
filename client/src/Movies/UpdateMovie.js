import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

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

   console.log(updateMovie)

   const handleChange = (e) => {
      e.preventDefault()

      let value = e.target.name === 'stars' ? e.target.value.split(',') : e.target.value

      setUpdateMovie({
         ...updateMovie,
         [e.target.name]: value
      })
   }

   const handleChangeMetascore = (e) => {
      e.preventDefault()

      if (e.target.name === 'metascore' && e.target.value < 0) {
         return e.target.value = 0
      }
      else if (e.target.name === 'metascore' && e.target.value > 100) {
         return e.target.value = 100
      }

      setUpdateMovie({
         ...updateMovie,
         [e.target.name]: parseInt(e.target.value)
      })
   }

   const saveMovie = (e) => {
      e.preventDefault()

      axios
         .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
         .then(res => {
            const updatedMovie = props.movies.filter(movie =>
               movie.id !== updateMovie.id
            )

            props.setMovieList([
               res.data,
               ...updatedMovie])

            push(`/movies/${id}`)
         })
         .catch(err => {
            console.log(err)
         })
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
                  Metascore:
                  <input
                     type='number'
                     min='0'
                     max='100'
                     name='metascore'
                     onChange={handleChangeMetascore}
                     value={updateMovie.metascore}
                  />
               </div>
               <h3>Actors</h3>
               <input
                  type='text'
                  name='stars'
                  onChange={handleChange}
                  value={updateMovie.stars}
               />
            </div>

            <button className='update-button' onClick={saveMovie}>
               Save Changes
            </button>
         </form>
      </div>
   )
}

export default UpdateMovie