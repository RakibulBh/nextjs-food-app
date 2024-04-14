'use client'

import { useRef, useState } from "react"
import classes from "./image-picker.module.css"

import Image from "next/image"


const ImagePicker = ({label, name}) => {
  const [pickedImage, setPickImage] = useState(null);
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickImage(null)
      return
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickImage(fileReader.result);
    }
    fileReader.readAsDataURL(file);

  }


  return (
    <div className={classes.picker}>
        <label htmlFor='image'>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
              {!pickedImage &&  <p>No image picket yet.</p>}
              {pickedImage && <Image src={pickedImage} alt="Image selected by user" fill/>}
            </div>
            <input className={classes.input} type='file' id='image' accept='image/png, inage/jpeg' name={name} ref={imageInput} onChange={handleImageChange} required/>
        </div>
        <button className={classes.button} type="button" onClick={handlePickClick}>Pick an image</button>
    </div>
  )
}

export default ImagePicker
