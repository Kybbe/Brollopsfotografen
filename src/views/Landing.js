import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("code")) {
      console.log("Not logged in");
      navigate("/");
    }
  }, []);

  return (
    <div className="Landing">
      <h1>Bröllopsfotografen</h1>
      <h2>Fånga ett nytt ögonblick</h2>
      <div className="Landing-buttons">
        <Link to="/Kamera">
          <button>Fånga ett nytt ögonblick</button>
        </Link>
        <Link to="/Galleri">
          <button>Se galleriet</button>
        </Link>
        <Link to="/">
          <button onClick={() => {
            localStorage.removeItem("code");
          }}>Byt bröllopskoden</button>
        </Link>
      </div>
    </div>
  );
}