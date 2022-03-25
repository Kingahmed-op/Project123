import React, { useEffect, useRef, useState } from "react";


function PixelSelect({ imageURL, dimension, selectionResolution, submitSequence }) {

  const [grid, setGrid] = useState();
  const selectedTiles = useRef([]);

  const handleTileClick = (e) => {
    const selectedTile = document.getElementById(e.target.id);
    const selectedTileId = e.target.id;
    if(selectedTiles.current.includes(selectedTileId)) {
      console.log("off");
      selectedTile.style.border = "";
      selectedTiles.current = selectedTiles.current.filter(id => id !== selectedTileId);
    } else {
      selectedTile.style.border = "2px solid red";
      selectedTiles.current.push(selectedTileId);
    }
  }

  useEffect(() => {
    let image = new Image(dimension, dimension);
    image.src = imageURL;
    image.crossOrigin = "anonymous";

    const gridContainer = document.querySelector("#selection-grid");

    let tileDimension = dimension / selectionResolution;
    image.addEventListener('load', () => {

      for (let row = 0, y = 0; y < dimension; y += tileDimension, row++) {
        for (let col = 0, x = 0; x < dimension; x += tileDimension, col++) {

          const canvas = document.createElement("canvas");
          canvas.width = tileDimension;
          canvas.height = tileDimension;
          canvas.id = `${row}_${col}`;
          canvas.addEventListener('click', handleTileClick);
          const ctx = canvas.getContext("2d");

          ctx.drawImage(image, x, y, 100, 100, 0, 0, 100, 100);

          gridContainer.appendChild(canvas);
        }
      }
    });
  }, [imageURL, dimension, selectionResolution]);

  return (
    <div className="md:w-1/4 mx-auto">
      <div id="selection-grid" className="grid grid-cols-5 gap-x-0 gap-y-2"></div>
      <button className="btn" onClick={() => {
        console.log(selectedTiles);
        submitSequence(selectedTiles);
      }}>Submit</button>
    </div>
  );
}

export default PixelSelect;
