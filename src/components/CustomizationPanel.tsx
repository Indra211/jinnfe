import { buttonIcons, fontOptions } from "../utils/const";
import { fontOptionsTypes, Settings } from "../utils/types";

export const CustomizationPanel: React.FC<{
  customization: Settings;
  setCustomization: React.Dispatch<React.SetStateAction<Settings>>;
}> = ({ customization, setCustomization }) => {
  return (
    <div className="customization-panel">
      <div>
        <label>Button Icon:</label>
        {buttonIcons?.map((item: string) => (
          <p
            onClick={() => {
              setCustomization((prev) => ({ ...prev, buttonIcon: item }));
            }}
            style={{
              background: customization.buttonIcon === item ? "#fff" : "",
            }}
            className="button-icon"
          >
            {item}
          </p>
        ))}
      </div>
      <div>
        <label>Border Color:</label>
        <input
          type="color"
          value={customization.borderColor}
          onChange={(e) =>
            setCustomization({
              ...customization,
              borderColor: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Border Radius:</label>
        <input
          type="range"
          value={customization.chatBotBorderRadius}
          onChange={(e) =>
            setCustomization({
              ...customization,
              chatBotBorderRadius: e.target.value,
            })
          }
          min={0}
          max={36}
        />
      </div>
      <div>
        <label>Header Background Color:</label>
        <input
          type="color"
          value={customization.headerBgColor}
          onChange={(e) =>
            setCustomization({
              ...customization,
              headerBgColor: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Bot Text Color:</label>
        <input
          type="color"
          value={customization.botTextColor}
          onChange={(e) =>
            setCustomization({
              ...customization,
              botTextColor: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Bot Chat Bubble Color:</label>
        <input
          type="color"
          value={customization.botBubbleBgColor}
          onChange={(e) =>
            setCustomization({
              ...customization,
              botBubbleBgColor: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>User Text Color:</label>
        <input
          type="color"
          value={customization.userChatTextColor}
          onChange={(e) =>
            setCustomization({
              ...customization,
              userChatTextColor: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>User Chat Bubble Color:</label>
        <input
          type="color"
          value={customization.userBubbleBgColor}
          onChange={(e) =>
            setCustomization({
              ...customization,
              userBubbleBgColor: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Font Style:</label>
        {fontOptions?.map((item: fontOptionsTypes) => (
          <p
            onClick={() => {
              setCustomization((prev) => ({
                ...prev,
                textFont: item.fontFamily,
              }));
            }}
            style={{
              background:
                customization.textFont === item.fontFamily ? "#fff" : "",
            }}
            className="button-icon"
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};
