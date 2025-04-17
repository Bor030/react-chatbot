import { useState } from "react";
import Chatbot from "./Chatbot";
import "./css/chatbot.css";

function App() {
  const [incomingQuery, setIncomingQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleQuerySubmit = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setIncomingQuery(e.target.value);
      setIsChatOpen(true);
      e.target.value = "";
    }
  };

  return (
    <div className="main-container">
      <section className="ai-section">
        {isChatOpen && <Chatbot incomingQuery={incomingQuery} />}
        
        <input
          type="text"
          placeholder="Ask our assistant..."
          onKeyDown={handleQuerySubmit}
          className="center-prompt"
        />
      </section>
    </div>
  );
}

export default App;



