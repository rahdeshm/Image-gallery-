import React,{useState,useEffect} from 'react';
import './App.css';
import Photo from './Photo/Photo';
import  data from  './data.json';
import {FaSearch} from 'react-icons/fa';
import axios from 'axios';

const clientId='?client_id=Ny14LUsLUppEAV_PFlMXJI86T7iR7AfGtek6H131Djo';
const mainUrl='https://api.unsplash.com/photos/';
const searchUrl='https://api.unsplash.com/search/photos/';



function App() {
  const [loading,setLoading]=useState('false');
  const[page,setPage]=useState(1);
  const [photos,setPhotos]=useState([]);
  const [query,setQuery]=useState('');


  const fetchImages=async()=>{
    setLoading(true);
    let url;
    const urlPage=`&page=${page}`;
    const urlQuery=`&query=${query}`;

    if(query){
     
      url=`${searchUrl}${clientId}${urlPage}${urlQuery}`;
    
    }
    else{
      url=`${mainUrl}${clientId}${urlPage}`
    }
    
    try{
      const response= await axios(url);
      // const data=await response.json();
      const data=response.data;
      console.log(data);
      setPhotos((oldPhoto)=>{
        if(query && page===1){
           return data.results;
        }
        else if(query){
          return [...oldPhoto,...data.results]
        }
        else{
          return [...oldPhoto,...data]
        }
      })
    }
    catch(error){
      setLoading(false);
    }
   
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setPage(1);
    setQuery(e.target.value)
    fetchImages()
  }
  useEffect(()=>{
    fetchImages();
    
    console.log(photos);
  },[page]);

  useEffect(()=>{
    const event=window.addEventListener('scroll',()=>{
    if( (loading)&& (window.innerHeight+document.documentElement.scrollTop+2)>=document.documentElement.scrollHeight)
   {
    setPage((oldPage)=>oldPage+1)
   }
    }) 
    return ()=>{
      window.removeEventListener('scroll',event)
    }

  });

  console.log(photos);
  return (
    <div>
      <main>
           <section className="search">
               <form className="search-form">
                  <input type='text' placeholder="search" className="form-input" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                  <button type="submit"  onClick={handleSubmit} className="submit-btn"><FaSearch/></button>
               </form>
           </section>
       
           <section className="photos">
              <div className="photos-center">
                
                 {
                   photos.map((item,index)=>(
                    <Photo key={index} item={item}/>
                   ))
                 }
              </div>
           </section>
        </main>
    </div>
  );
}

export default App;
