import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initialMovie = {
   title: '',
   director: '',
   metascore: 0,
   stars: []
}

const AddMovie = (props) => {
   const [newMovie, setNewMovie] = useState(initialMovie)
   const { push } = useHistory()

   const handleChange = (e) => {
      e.preventDefault()

      setNewMovie({
         ...newMovie,
         [e.target.name]: e.target.value
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

      setNewMovie({
         ...newMovie,
         [e.target.name]: parseInt(e.target.value)
      })
   }

   const handleChangeStars = (e) => {
      e.preventDefault()

      setNewMovie({
         ...newMovie,
         [e.target.name]: e.target.value.split(',')
      })
   }

   const saveToList = (e) => {
      e.preventDefault()

      axios
         .post(`http://localhost:5000/api/movies`, newMovie)
         .then(res => {
            props.setMovieList(res.data)
            push('/')
         })
         .catch(err => {
            console.log(err)
         })
   }

   return (
      <div className="save-wrapper">
         <h2> Update Movie </h2>
         <form>
            <div className="movie-card">
               <h2> Title: <em>
                  <input
                     type='text'
                     name='title'
                     onChange={handleChange}
                     value={newMovie.title}
                  />
               </em>
               </h2>
               <div className="movie-director">
                  Director: <em>
                     <input
                        type='text'
                        name='director'
                        onChange={handleChange}
                        value={newMovie.director}
                     />
                  </em>
               </div>
               <div className="movie-metascore">
                  Metascore: <em>
                     <input
                        type='number'
                        min='0'
                        max='100'
                        name='metascore'
                        onChange={handleChangeMetascore}
                        value={newMovie.metascore}
                     />
                  </em>
               </div>

               <h3>Actors</h3>
               <input
                  type='text'
                  name='stars'
                  onChange={handleChangeStars}
                  value={newMovie.stars}
               />

               <button className='update-button' onClick={saveToList}>
                  Save
               </button>
            </div >
         </form >
      </div >
   )
}

export default AddMovie