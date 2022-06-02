import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Camera from '../components/CameraModule';
import PhotoPreview from '../components/PhotoPreview';

import menuIcon from '../Menu.png';

export default function Kamera({images, addImage}) {
  var notificationPermission = "";
  const [image, setImage] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("code")) {
      console.log("Not logged in");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (image) {
      addImage(image);
    }
  }, [image]);

  function notifs() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }
    Notification.requestPermission().then(function(result) {
      if (result === 'denied') {
        notificationPermission = "denied";
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      }
      if (result === 'default') {
        notificationPermission = "default";
        console.log('The permission request was dismissed.');
        return;
      }
      notificationPermission = "granted";
      console.log('Permission was granted for notifications');
    });
  }

  function sendNotif() {
    notifs();
    if (notificationPermission !== "granted") { return; }
    let text = "Klick! Din bild är nu sparad, klicka här för att se den i galleriet!";

    const notification = new Notification('Bröllopsfotografen', {
      body: text,
      icon: './favicon.ico',
    });

    notification.onclick = function() {
      window.open('https://localhost:3000/Galleri');
    };
  }

  return (
    <div className="Kamera">
      { image ? <PhotoPreview image={image} setImage={setImage} /> : <Camera setImage={setImage} notis={sendNotif} /> }

      <Link to="/Landing" className="GoBackToLanding">
        <button className="GoBackToLandingBtn">Go to Landing Page</button>
      </Link>
      <Link to="/Galleri">
        <button className='GoToGalleryBtn'><img src={menuIcon} alt='Menu'></img></button>
      </Link>
    </div>
  );
}