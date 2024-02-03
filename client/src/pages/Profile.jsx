import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'

export default function Profile() {

  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})

  
  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[image])

  /* Función para subir la imagen de perfil a firebase y mostrar el progreso (%) de subida. */
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);  //Conectamos con FireBase
    const fileName = new Date().getTime() + image.name; //Hacemos que la imagen subida sea única obteniendo la fecha
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image); //subimos la imagen referenciada a FireBase
    uploadTask.on(
      'state_changed',
      (snapshot) => { //mostramos el progreso de subida de archivo.
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress)); //redondeamos el progreso de subida para que no muestre decimales
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
          /* Si han introducido datos en el formulario, copiamos esos datos (...formData) y le añadimos
          la imagen de perfil que ha subido el usuario, de la cual hemos obtenido la url */
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
      {/* 
      FIREBASE STORAGE RULES

      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*');
       */}
      <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
      {/* files[0] para utilizar solo la primera imagen en caso de que el usuario suba más de una */}
        <img 
          src={formData.profilePicture || currentUser.profilePicture} 
          alt="" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" 
          onClick={() => fileRef.current.click()}
          />
          <p className='text-sm self-center'> 
          {/*  Si hay error en la subida de la imagen, mostrará error*/}
          {/* Si el % del progreso de subida está entre 0 y 100 mostrará el progreso */}
          {/* Si el progreso de subida es 100 mostrará que se ha subido correctamente */}
            {imageError ? (
              <span className='text-red-500'>Error uploading image (FileSize must be less than 2 MB)</span>) : imagePercent > 0 && imagePercent < 100 ? (
                <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>) : imagePercent === 100 ? (
                  <span className='text-green-700'>Image uploaded successfully</span>) : ('')}
          </p>
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" />
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
