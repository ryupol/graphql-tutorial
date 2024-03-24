import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      name
      year
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h3> DATA IS LOADING...</h3>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      {data &&
        data.users.map((user) => (
          <>
            <h3>Name: {user.name}</h3>
            <h3>Username: {user.username}</h3>
            <h3>Age: {user.age} </h3>
            <h3>Nationality: {user.nationality} </h3>
          </>
        ))}

      {movieData && movieData.movies.map((movie) => <h3>{movie.name}</h3>)}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() => {
            fetchMovie({ variables: { name: movieSearched } });
          }}
        >
          Fetch Data
        </button>
        {movieSearchedData ? (
          <div>
            <h1>MovieName: {movieSearchedData.movie.name}</h1>
            <h1>Year Of Publication: {movieSearchedData.movie.year}</h1>
          </div>
        ) : (
          <h1>There are No data</h1>
        )}
      </div>
    </div>
  );
}

export default DisplayData;
