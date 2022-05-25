export default function PhotoPreview({image, setImage}) {

  function setPhotoNull() {
    setImage(null);
  }

  return (
    <div className="PhotoPreview">
      <img className="photoPreviewImg" src={image.image} style={image.filter ? {filter: image.filter} : {}} alt="Preview" />
      <button className="newPhotoBtn" onClick={setPhotoNull}>Fånga ett nytt ögonblick</button>
    </div>
  );
}