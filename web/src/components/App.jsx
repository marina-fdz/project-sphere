// Fichero src/components/App.jsx
import '../styles/App.scss';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import { Route, Routes } from 'react-router';
import Landing from './Landing';
import {useEffect, useState} from 'react';
// Importamos el servicio del local storage
import ls from '../services/localStorage';
import postData from '../services/postData';
import DetailProject from './DetailProject';
// import getData from '../services/getData';
//basta yaa

function App() {

    const localStorageData = ls.get('data', {
      name: '',
      slogan: '',
      technologies: '',
      idProject: '',
      repo: '',
      demo: '',
      desc: '',
      autor: '',
      job: '',
      image: '',
      photo: ''
  });

  const [data, setData] = useState(localStorageData);
  const [allProjects, setAllProjects] = useState([]);
  const [state, setState] = useState(false);

  
 //fetch data for landing
  useEffect(()=>{
    fetch(import.meta.env.VITE_API_HOST+'/getprojects')
        .then(response => response.json())
        .then(info => {
            setAllProjects(info.data);
            console.log(info.data);
        })
  }, [state]);

  useEffect(() => {
      // Guardamos data en el local storage
      ls.set('data', data);
  }, [data]);

  const updateAvatar = (id, avatar) => {
      setData({...data, [id]: avatar});
  };
  
  const getInput = (id, value)=>{
      setData({...data, [id]: value});
  }

  function resetData(){
    setData({
      name: '',
      idProject: '',
      slogan: '',
      technologies: '',
      repo: '',
      demo: '',
      desc: '',
      autor: '',
      job: '',
      image: '',
      photo: ''
  });
  }

  const deleteItem = async (id) => {
    const response = await fetch(import.meta.env.VITE_API_HOST+`/delete/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      // setAllProjects(allProjects.filter(project => project.idProject !== id));
      setState((prevState) => !prevState)
    } else {
      alert('Error deleting item');
    }
  };



  return (
    <div className="container container.dark">
      <Header/>
      <Routes>
        <Route path='/' element={<Landing allProjects={allProjects} data={data} deleteItem={deleteItem}/>}/>
        <Route path='/createproject' element={<Main getInput={getInput} updateAvatar={updateAvatar} data={data} resetData={resetData}/>}/>
        <Route path='/projectdetail' element={<DetailProject data={data}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;