import React, { useState, useEffect } from "react";

export default function Meme() {
  //  initializing the meme state with default values
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  // setting meme image state to memeData..
  const [allMemeImages, setAllMemeImages] = useState([]);

  //use Effect to to manage the side effect

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes))
      .catch((error) => console.log(error));
  }, []);
  //function to handle the click of get new meme image button

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    //seeting   an new meme with an updater function
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
  }
  //   function to set the top and bottom text of the meme
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          value={meme.topText}
          name="topText"
          placeholder="Top text"
          className="form--input"
          onChange={handleChange}
        />
        <input
          type="text"
          value={meme.bottomText}
          name="bottomText"
          placeholder="Bottom text"
          className="form--input"
          onChange={handleChange}
        />

        <button onClick={getMemeImage} className="form--button">
          Get a new meme image 🤣
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

/**
 * @returns {JSX.Element}
 */
