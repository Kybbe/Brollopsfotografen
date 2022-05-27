import { useEffect, useRef, useState } from "react";

export default function Camera({setImage, notis}) {
  let video = useRef(null);
  let canvas = useRef(null);
  let hue = useRef(null);
  let stream;
  let cameraDirection = "user";

  let [currentFilter, setCurrentFilter] = useState("none");
  
  function takePhoto() {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = video.current.videoWidth;
    canvas.current.height = video.current.videoHeight;
    ctx.drawImage(video.current, 0, 0); // draw the video frame to the canvas
    const data = canvas.current.toDataURL('image/png'); // get the image data

    let name = localStorage.getItem("name");
    let code = localStorage.getItem("code");
    let personalID = localStorage.getItem("personalID");
    setImage({image: data, code: code, name: name, personalID: personalID, filter: currentFilter }); // set the image data to the state
    notis(); // send a notification
    stream.getTracks().forEach(function(track) { // turn off the camera
      track.stop();
    });
  }

  function flipCamera() {
    if (stream) {
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
    if (cameraDirection === "user") {
      cameraDirection = "environment";
    } else {
      cameraDirection = "user";
    }
    startCamera(cameraDirection);
  }

  async function startCamera(cameraDirection) {
    let options = {
      audio: false,
      video: {
        width: { ideal: 320 }, 
        height: { ideal: 240 },
        facingMode: cameraDirection
      }
    };

    if (navigator.mediaDevices.getUserMedia) {
      stream = await navigator.mediaDevices.getUserMedia(options);
      video.current.srcObject = stream;
      video.current.play();
    }
  }

  useEffect(() => {
    startCamera();
  }, []);

  let filters = [
    {"name": "none", "filter": "none"},
    {"name": "Grayscale", "filter": "grayscale(100%)"},
    {"name": "Sepia", "filter": "sepia(100%)"},
    {"name": "Invert", "filter": "invert(100%)"},
    {"name": "OverSaturate", "filter": "saturate(150%)"},
    {"name": "UnderSaturate", "filter": "saturate(50%)"},
    {"name": "Hue-rotate", "filter": "hue-rotate(100deg)"},
    {"name": "Brighter", "filter": "brightness(150%)"},
    {"name": "Darker", "filter": "brightness(50%)"},
    {"name": "Contrast", "filter": "contrast(150%)"},
    {"name": "Blur", "filter": "blur(10px)"},
    {"name": "Drop-shadow", "filter": "drop-shadow(10px 10px 10px black)"}
  ];

  return (
    <div className="Camera">
      <div className="cameraContainer">
        <video ref={video} className="cameraVideo" autoPlay muted></video>
        <button className="flipCamera" onClick={flipCamera}>↺</button>
      </div>
      <canvas ref={canvas} className="cameraCanvas" width="640" height="480" style={{display: "none"}}></canvas>
      <div className="filterContainer">
        {filters.map((filter, index) => {
          if(filter.name === "Hue-rotate") {
            return (
              <label key={index} className="Hue-rotate">
                Hue-Rotate:
                <input ref={hue} type="range" min="0" max="359" defaultValue="160" onChange={() => {
                  const ctx = canvas.current.getContext('2d');
                  ctx.filter = "hue-rotate(" + hue.current.value + "deg)";
                  setCurrentFilter("hue-rotate(" + hue.current.value + "deg)");
                  video.current.style.filter = "hue-rotate(" + hue.current.value + "deg)";
                }}></input>
              </label>
            )
          } else {
            return (
              <button key={index} className={currentFilter === filter.filter ? "filterButton activeFilter" : "filterButton"} onClick={() => {
                const ctx = canvas.current.getContext('2d');
                ctx.filter = filter.filter;
                video.current.style.filter = filter.filter;
                setCurrentFilter(filter.filter);
              }}>{filter.name}</button>
            )
          }
        })}
      </div>
      <button onClick={takePhoto} className="takePhotoBtn">Föreviga ögonblicket</button>
    </div>
  );
}