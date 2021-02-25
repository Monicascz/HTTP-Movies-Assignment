import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieUpdateForm from "./Movies/MovieUpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);


  
  return (
    <>
      <SavedList list={savedList} />
    <Switch>
          <Route path="/movies/:id">
            <Movie addToSavedList={addToSavedList} />
          </Route>

          //Route from movie update form. 
          <Route path="/update-movie/:id"  render={(props)=>{
            return (<MovieUpdateForm {...props} movieList={movieList} setMovieList={setMovieList}/>)
          }}/>

          <Route exact path="/">
            <MovieList movies={movieList} />
          </Route>
    </Switch>
    </>
  );
};

export default App;
