import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './views/Login';
import Landing from './views/Landing';
import Kamera from './views/Camera';
import Galleri from './views/Gallery';

function App() {
  let imagesFromLocalStorage = JSON.parse(localStorage.getItem("images"));
  const [images, setImages] = useState(imagesFromLocalStorage || []);

  let jsonBinApi = "$2b$10$Lu56mbWCTqNouFfGyWM3ze9/8PagwOjoqAx.H4fIwodnINXr0HOsK"
  let binID = "628ddd2505f31f68b3a6499b"

  function addToImages(image) {
    setImages([...images, image]);
  }

  function removeFromImages(image) {
    let newImages = images.filter(img => img !== image);
    setImages(newImages);
  }

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));

    if(images.length > 0) {
      updateBin([...images]);
    }
  }, [images]);

  useEffect(() => {
    if (localStorage.getItem("images")) {
      setImages(JSON.parse(localStorage.getItem("images")));
    }

    readBin();
  }, []);

  async function createBin() {
    let url = "https://api.jsonbin.io/b";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": jsonBinApi,
      },
      body: JSON.stringify({
        "images": [],
      }),
    })

    let json = await response.json();
  }

  async function readBin() {
    let url = `https://api.jsonbin.io/v3/b/${binID}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": jsonBinApi,
      },
    })

    let json = await response.json();
    setImages(json.record.images);
  }

  async function updateBin(data) {
    var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

    let url = `https://api.jsonbin.io/v3/b/${binID}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": jsonBinApi,
      },
      body: JSON.stringify({
        "images": data,
      }),
    })

    let json = await response.json();
    console.log("updated bin: ", json);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} /> {/* Dom har tagit bort optional params i V6 av react router  */}
        <Route path="/:id" element={<Login />} /> {/* Så nu måste man skriva sån här ful skit ist för bara */}
        {/* path="/:id?" vilket hade varit mycket snyggare :( */}
        {/* Detta är btw så man kan göra en qr kod osv med koden redo för gäster, så dom slipper skriva in koden själva */}
        {/* Men man ska självklart kunna använda appen utan detta, så därför ska den vara OPTIONAL */}

        <Route path='/Landing' element={ <Landing /> } />
        <Route path='/Kamera' element={ <Kamera images={images} addImage={addToImages} /> } />
        <Route path='/Galleri' element={ <Galleri images={images} removeFromImages={removeFromImages} /> } />
      </Routes>
    </div>
  );
}

export default App;
