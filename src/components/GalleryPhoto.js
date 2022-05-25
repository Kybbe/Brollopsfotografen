export default function GalleryPhoto({photo, index, removePhoto}) {
  let myPersonalID = localStorage.getItem("personalID");

  function deleteImg(){
    removePhoto(photo);
  }

  return (
    <div key={index} className="photo">

      {/* Du är bara tillåten att ta bort dina egna bilder! */}
      {/* personalID är ett uuid angivet i Login.js, sparat i localstorage :) */}
      {photo.personalID === myPersonalID ? <button onClick={deleteImg} className="deletePhoto">ⓧ</button> : ""}
      <img src={photo.image} alt="Preview" style={photo.filter ? {filter: photo.filter} : {}}/>
    </div>
  );
}