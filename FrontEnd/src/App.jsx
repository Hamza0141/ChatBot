// src/App.jsx
import React, { useState } from "react";
import axios from "axios";


const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user message to the conversation
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await axios.post("http://localhost:4000/api/chat", {
        message: input,
      });
      const aiMessage = {
        role: "assistant",
        content: res.data.choices[0].message.content,
      };

      // Add AI response to the conversation
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
      const errorMessage = {
        role: "assistant",
        content: "Error communicating with OpenAI",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    // Clear the input
    setInput("");
  };

  return (
    <div className="container">
      <h1>Chat with ChatGPT</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-message" : "ai-message"}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Type your message here..."
          required
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
