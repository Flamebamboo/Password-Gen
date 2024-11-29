import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [isCopied, setIsCopied] = useState("Copy Password");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed]);

  const copyPassToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    setIsCopied("Copied!");
    setTimeout(() => setIsCopied("Copy Password"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassToClipBoard}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isCopied}
        </button>
      </div>
      <div className="mt-6 w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="length" className="block text-gray-700 mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            id="length"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numberAllowed" className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed((prev) => !prev)}
              id="numberAllowed"
              className="mr-2"
            />
            Allow Numbers
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="charAllowed" className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed((prev) => !prev)}
              id="charAllowed"
              className="mr-2"
            />
            Allow Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
