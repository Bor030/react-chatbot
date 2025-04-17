import { useEffect, useRef, useState } from "react";

function Chatbot({ incomingQuery }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);

useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  // When a query comes in from outside (App), open chat + send it
  useEffect(() => {
    if (incomingQuery) {
      setIsOpen(true);
      setInput(incomingQuery);
      sendMessage(incomingQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingQuery]);

  const handleInputChange = (e) => setInput(e.target.value);

  const sendMessage = async (customInput) => {
    const finalInput = customInput || input;
    if (!finalInput.trim()) return;

    const newMessages = [...messages, { role: "user", content: finalInput }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const botReply = data.reply || { role: "assistant", content: "Something went wrong." };
      setMessages([...newMessages, botReply]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Server error." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className={`chatbot-window-inline ${isOpen ? "open" : ""}`}>
      <div className="chatbot-header">
        <span>Web Assistant</span>
        <button onClick={() => setIsOpen(false)} className="chatbot-close">
          ✖
        </button>
      </div>

      <div className="chatbot-messages">
  {messages.map((m, i) => (
    <div
      key={i}
      className={`chat-message ${m.role === "user" ? "user" : "bot"}`}
    >
      <div className="bubble">
        <strong>{m.role === "user" ? "You" : "Bot"}</strong>
        {m.content}
      </div>
      <div ref={messagesEndRef} />
    </div>
    
  ))}
</div>

    {/*   <div className="chatbot-input-container">
        <input
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="chatbot-input"
        />
      </div> */}
    </div>
  );
}

export default Chatbot;







