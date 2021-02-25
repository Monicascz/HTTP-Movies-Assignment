import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'

// const initialMovieFormValues = {
//     title: "",
//     director: "",
//     metascore: "",
//     stars: ["","",""] // LATER THIS SHOULD BE AN ARRAY OF MOVIES. 
// }


const MovieUpdateForm = ({movieList, setMovieList}) =>{
const [formValues, setFormValues] = useState({})    
const {id} = useParams();
const {push} = useHistory();  

useEffect(()=>{
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then((res)=>{
       
        setFormValues(res.data)
       
    })
    .catch((err)=>{
        console.log("Oops there is an error", err)
    })
},[])

    const handleMovieChange = (e) =>{
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, formValues)
        .then((res)=>{
            console.log("handleSubmit", res.data)
            console.log("movieList - handleSubmit", movieList)
            setMovieList([...movieList, res.data])
            push('/')

        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    return (
        <div>
            <form onSubmit ={handleSubmit}>
                <label>
                    <input
                    name="title"
                    type="text"
                    value={formValues.title}
                    onChange= {handleMovieChange}
                    placeholder="Movie Title"
                    >
                    </input>
                </label>
                <label>
                    <input
                    name="director"
                    type="text"
                    value={formValues.director}
                    onChange= {handleMovieChange}
                    placeholder="Movie Director"
                    >
                    </input>
                </label>
                <label>
                    <input
                    name="metascore"
                    type="text"
                    value={formValues.metascore}
                    onChange= {handleMovieChange}
                    placeholder="MetaScore"
                    >
                    </input>
                </label>
                <label>
                    <input
                    name="stars"
                    type="text"
                    value={formValues.stars}
                    onChange= {handleMovieChange}
                    placeholder="stars REMEMBER THIS SHOULD BE AN ARRAY OF STRINGS"
                    >
                    </input>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default MovieUpdateForm;