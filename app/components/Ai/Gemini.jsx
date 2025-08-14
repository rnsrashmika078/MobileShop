import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI("AIzaSyCWoGfvkQq8lsNPWQYeTuYDDzRN2x4AVOs");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

function Gemini() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to generate content from the Gemini API
  const generateContent = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      setResponse(responseText);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    generateContent();
  };

  // Handle clear button
  const handleClear = () => {
    setPrompt('');
    setResponse('');
    setError('');
  };

  return (
    <div className="App">
      <h1>Gemini 1.5 Flash Chat</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Send'}
        </button>
        <button type="button" onClick={handleClear} disabled={loading}>
          Clear
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Gemini;