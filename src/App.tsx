import React, { useState } from "react";
import "./App.css";
import { buttonIcons, fontOptions } from "./utils/const";
import { CustomizationPanel } from "./components/CustomizationPanel";
import { ChatWindow } from "./components/ChatWindow";

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I have a question", isBot: false },
    { id: 2, text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [chatBubble, setChatBubble] = useState({
    isUser: false,
    isBot: false,
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setChatBubble((prev) => ({ ...prev, isUser: false, isBot: true }));
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, isBot: false },
      ]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "I am here to assist you!",
            isBot: true,
          },
        ]);
        setChatBubble((prev) => ({ ...prev, isUser: false, isBot: false }));
      }, 1000);
    }
  };

  const [customization, setCustomization] = useState({
    buttonIcon: buttonIcons[0],
    headerBgColor: "#fff",
    chatBotBorderRadius: "10",
    borderColor: "#000",
    botTextColor: "#000",
    userChatTextColor: "#fff",
    botBubbleBgColor: "#fff",
    userBubbleBgColor: "#000",
    textFont: fontOptions[0]?.fontFamily,
  });

  return (
    <div className="app">
      <CustomizationPanel
        customization={customization}
        setCustomization={setCustomization}
      />
      <ChatWindow
        customization={customization}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        chatBubble={chatBubble}
        setChatBubble={setChatBubble}
      />
    </div>
  );
};

export default App;
