import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GalleryPhoto from "../components/GalleryPhoto";

import logoImg from "../Logo.png";

export default function Gallery({images, removeFromImages}) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(false);

    if(!localStorage.getItem("code")) { // get wedding code from localstorage
      console.log("Not logged in");
      navigate("/");
    }
  }, []);
  
  function removePhoto(removedPhoto) {
    removeFromImages(removedPhoto);
  }

  let photosMap = images.map((photo, index) => {
    return (
      <GalleryPhoto photo={photo} index={index} removePhoto={removePhoto} key={index}/>
    )
  });

  return (
    <div className="Gallery">
      <Link to="/Landing" className="GoBackToLanding">
        <button className="GoBackToLandingBtn">Go to Landing Page</button>
      </Link>
      <Link to="/Kamera" className="GoBackToCameraBtnLink">
        <button className="GoBackToCameraBtn"><img src={logoImg} alt="Logo"></img></button>
      </Link>

      {loading ? "Loading..." : photosMap}
      { photosMap.length === 0 ? "Inga bilder ännu... Klicka på knappen i höger hörn för att ta ett!" : "" }
    </div>
  );
}