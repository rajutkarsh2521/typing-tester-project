import ReactDOM from "react-dom/client"
import React, { useState, useEffect } from 'react';


const sampleText = [
  "The quick brown fox jumps over the lazy dog.",
  "React makes it painless to create interactive UIs.",
  "JavaScript is a versatile language for web development.",
  "CSS is a stylesheet language used to describe the presentation of a document written in HTML or XML.",
  "Learning React can greatly improve your web development skills."
];

function App() {
  const [text, setText] = useState(sampleText[0]);     
  const [input, setInput] = useState(''); 
  const [startTime, setStartTime] = useState(null);   
  const [endTime, setEndTime] = useState(null);               
  
  const [isTyping, setIsTyping] = useState(false); 
  const [isFinished, setIsFinished] = useState(false);      
  const [wpm, setWpm] = useState(0); 
  const [accuracy, setAccuracy] = useState(0);  

  useEffect(() => {
    
    if (input === text) {
      setEndTime(new Date());
      setIsFinished(true);
      setIsTyping(false);
      calculateSpeedAndAccuracy(input, text, startTime, new Date());
    }
  }, [input]);

  const handleChange = (e) => {
    if (!isTyping) {
      setStartTime(new Date());   
      setIsTyping(true);
    }
    setInput(e.target.value);
  };

  const calculateSpeedAndAccuracy = (inputText, referenceText, startTime, endTime) => {
    const totalTimeInMinutes = (endTime - startTime) / 60000;     
    const wordsTyped = inputText.split(' ').length;  
    const wpm = (wordsTyped / totalTimeInMinutes).toFixed(2);     
    setWpm(wpm);

    
    let correctChars = 0;
    for (let i = 0; i < Math.min(inputText.length, referenceText.length); i++) {
      if (inputText[i] === referenceText[i]) {
        correctChars++;
      }
    }
    const accuracy = ((correctChars / referenceText.length) * 100).toFixed(2);
    setAccuracy(accuracy);
  };

  const restartTest = () => {
    setText(sampleText[Math.floor(Math.random() * sampleText.length)]); 
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setIsTyping(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(0);
  };

  return (
    <div className="App">
      <h1>Typing Speed Test</h1>
      <div className="test-container">
        <p className="text-to-type">{text}</p>
        <textarea
          value={input}
          onChange={handleChange}
          placeholder="Start typing above text..."
          rows="5"
          disabled={isFinished}
        ></textarea>
        {isFinished ? (
          <div className="results">
            <h2>Test Completed!</h2>
            <p><strong>Words Per Minute (WPM):</strong> {wpm}</p>
            <p><strong>Accuracy:</strong> {accuracy}%</p>
            <button onClick={restartTest}>Restart Test</button>
          </div>
        ) : (
          <p className="typing-instructions">Type the text above as quickly and accurately as you can!</p>
        )}
      </div>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>)
