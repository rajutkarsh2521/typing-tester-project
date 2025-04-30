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
  const [text, setText] = useState(sampleText[0]); // Random text for typing
  const [input, setInput] = useState(''); // User input
  const [startTime, setStartTime] = useState(null); // Timer start
  const [endTime, setEndTime] = useState(null); // Timer end
  const [isTyping, setIsTyping] = useState(false); // To check if the user started typing
  const [isFinished, setIsFinished] = useState(false); // Check if user finished typing
  const [wpm, setWpm] = useState(0); // Words per minute
  const [accuracy, setAccuracy] = useState(0); // Accuracy

  useEffect(() => {
    // When the text is complete, calculate WPM and Accuracy
    if (input === text) {
      setEndTime(new Date());
      setIsFinished(true);
      setIsTyping(false);
      calculateSpeedAndAccuracy(input, text, startTime, new Date());
    }
  }, [input]);

  const handleChange = (e) => {
    if (!isTyping) {
      setStartTime(new Date()); // Start the timer once the user starts typing
      setIsTyping(true);
    }
    setInput(e.target.value);
  };

  const calculateSpeedAndAccuracy = (inputText, referenceText, startTime, endTime) => {
    const totalTimeInMinutes = (endTime - startTime) / 60000; // Convert time to minutes
    const wordsTyped = inputText.split(' ').length; // Number of words typed
    const wpm = (wordsTyped / totalTimeInMinutes).toFixed(2); // Words per minute calculation
    setWpm(wpm);

    // Calculate accuracy
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
    setText(sampleText[Math.floor(Math.random() * sampleText.length)]); // Randomize the text
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