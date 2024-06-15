import SignatureCanvas from "react-signature-canvas";
import React, { useRef, useState } from "react";

const SigneturePage = () => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const canvas = sigCanvas.current.getCanvas();
    const ctx = canvas.getContext("2d");

   
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
    const dataUrl = tempCanvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "signature.png";
    link.click();
  };

  const changeBackgroundColor = (e) => {
    setBackgroundColor(e.target.value);
  };
  return (
    <div className="p-4 bg-slate-200 min-h-screen flex flex-col items-center">
        

      <h1 className="text-6xl text-center text-gray-800 leading-extra-tight drop-shadow-xl font  mt-5 font-thin font-serif mb-10">
        Signature Board
      </h1>
      <p className="flex text-lg  mb-5">Write Your Signature bellow :</p>
      <div
        className="w-full max-w-lg mx-auto h-[300px] rounded-lg drop-shadow bg-slate-100 mb-4"
        style={{ backgroundColor: backgroundColor }}
      >
        <SignatureCanvas
          penColor="black"
          ref={sigCanvas}
          canvasProps={{
            width: 500,
            height: 300,
            className: "sigCanvas",
            style: {
              backgroundColor: backgroundColor,
              width: "100%",
              height: "100%",
            },
          }}
        />
      </div>
      <div className="flex space-x-2 justify-center mb-4 gap-2 mt-10">
        <button
          onClick={clear}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
        <button
          onClick={save}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download
        </button>
        <label className="text-center bg-green-500 text-white p-2 rounded items-center mt-1">Color Picker :</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={changeBackgroundColor}
          className="w-10 h-10 p-0 border-none"
        />
      </div>
        
    </div>
  );
};

export default SigneturePage;
