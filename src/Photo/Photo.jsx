import React from "react";
import './Photo.scss';

const Photo=({item})=>{   
   const {
    urls:{regular},
    alt_description,
    likes,
    user:{name,portfolio_url,profile_image:{medium}}} =item ;
    return(
        <article>
            <img src={regular} alt_description={alt_description} className='imgPhoto'/>
            <div className="photo-info">
              {/* <div>
                <h4>{name}</h4>
                <p>{likes}</p>
              </div> */}
              {/* <a href={portfolio_url} >
                <img src={medium} className="user-img"></img>
              </a> */}
            </div>       

        </article>
    )
}

export default Photo