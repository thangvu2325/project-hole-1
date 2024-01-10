import { useEffect, useState } from "react";

const useMousePosition = () => {
let canvas;
  const [mouseCoords, setMouseCoords] = useState({
    x: 0,
    y: 0
  });

  const handleCursorMovement = (e) => {

     const canvas = e.currentTarget;
     const rect = e.target.getBoundingClientRect();
     setMouseCoords({
       x: e.clientX - rect.left ,
       y: e.clientY - rect.top
     });
  };

  useEffect(() => {
    canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", handleCursorMovement);
  }, []);

  return [mouseCoords, handleCursorMovement];

}

export default useMousePosition;
