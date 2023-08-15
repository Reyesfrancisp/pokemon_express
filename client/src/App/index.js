import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// components
import Header from '../components/Header';
import Redirect from '../components/Redirect';
import Footer from '../components/Footer';

// pages
import AuthForm from '../pages/AuthForm';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';
import TeamList from '../pages/Team';
import TeamEdit from '../pages/TeamEdit';

function App() {
  const [state, setState] = useState({
    user: null,
    notes: [],
    loading: true
  });

  const [userState, setUserState ] = useState({
    user: "",
    teams: [],
    favorites: [],
    teamID: "",
    pokemonID: "",
    moveID: "",
  })

  useEffect(() => {
    axios.get('/authenticated')
      .then(res => {
        setState({
          ...state,
          user: res.data.user,
          loading: false
        });
      });
  }, []);


  return (
    <>
      <Header state={state} setState={setState} />

      {/* {state.loading && <Loading />} */}




      <Routes>


        <Route path="/search" element={<Search state={userState} setState={setUserState}/>} />

        <Route path="/team" element={<TeamList userState={userState} setUserState={setUserState}/>} />

        <Route path="/team-edit" element={<TeamEdit userState={userState} setUserState={setUserState}/>} />
        
        <Route path="/" element={<Landing />} />

        <Route path="/auth" element={(
          <Redirect user={state.user}>
            <AuthForm setState={setState} />
          </Redirect>
        )} />

        <Route path="/dashboard" element={(
          <Redirect user={state.user}>
            <Dashboard state={state} setState={setState} />
          </Redirect>
        )} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
