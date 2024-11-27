import React, { useEffect, useRef } from "react";
import { Settings } from "../utils/types";
import { chatBubbleIcon } from "../utils/const";

export const ChatWindow: React.FC<{
  customization: Settings;
  messages: { id: number; text: string; isBot: boolean }[];
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: React.FormEventHandler;
  chatBubble: { isUser: boolean; isBot: boolean };
  setChatBubble: React.Dispatch<
    React.SetStateAction<{ isUser: boolean; isBot: boolean }>
  >;
}> = ({
  customization,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  chatBubble,
  setChatBubble,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, chatBubble]);

  return (
    <div
      className="chat-window"
      style={{
        borderRadius: parseInt(customization.chatBotBorderRadius),
        border: `2px solid ${customization.borderColor}`,
        overflow: "hidden",
      }}
    >
      <div
        className="chat-header"
        style={{
          backgroundColor: customization.headerBgColor,
        }}
      >
        <div className="chat-header-content">
          <img
            src="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=100&h=100"
            alt="ChatBot"
            className="chat-header-image"
          />
          <div>
            <h3
              className="chat-header-title"
              style={{ fontFamily: customization.textFont }}
            >
              AI Assistant
            </h3>
            <p
              className="chat-header-subtitle"
              style={{ fontFamily: customization.textFont }}
            >
              Always here to help
            </p>
          </div>
        </div>
      </div>

      <div className="chat-messages" ref={messagesEndRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.isBot ? "bot-message" : "user-message"
            }`}
            style={{
              color: message.isBot
                ? customization.botTextColor
                : customization.userChatTextColor,
              fontFamily: customization.textFont,
            }}
          >
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        {(chatBubble.isBot || chatBubble.isUser) && (
          <div
            className={`chat-message ${
              chatBubble.isBot ? "bot-message" : "user-message"
            }`}
            style={{
              maxWidth: "100%",
              fontFamily: customization.textFont,
              color: chatBubble.isBot
                ? customization.botTextColor
                : customization.userChatTextColor,
              overflow: "hidden",
            }}
          >
            {" "}
            <p
              style={{
                borderRadius: 10,
                border: "1px solid #ccc",
                padding: "10px",
                backgroundColor: chatBubble.isBot
                  ? customization.botBubbleBgColor
                  : customization.userBubbleBgColor,
                textAlign: chatBubble.isBot ? "left" : "right",
              }}
            >
              Typing...{chatBubbleIcon}{" "}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setNewMessage(e.target.value);
              setChatBubble((prev) => ({
                ...prev,
                isUser: false,
                isBot: false,
              }));
            }
            if (e.target.value.length <= 150 && e.target.value.length > 0) {
              setNewMessage(e.target.value);
              setChatBubble((prev) => ({
                ...prev,
                isUser: true,
                isBot: false,
              }));
            }
          }}
          placeholder="Type your message..."
          className="chat-input"
          style={{
            fontFamily: customization.textFont,
          }}
        />
        <button type="submit" className="chat-send-button">
          {customization.buttonIcon}
        </button>
      </form>
    </div>
  );
};
