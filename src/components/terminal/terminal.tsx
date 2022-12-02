import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
export default function terminal() {
  const [text, setText] = useState("");
  type type_for_assignment = "help" | "clear" | "whoami" | "cv";
  const commands: Array<type_for_assignment> = [
    "help",
    "clear",
    "whoami",
    "cv",
  ];
  const help_contents = {
    help: "Lists all commands.",
    clear: "Clear all history",
    whoami: "A brief summary of my life.",
    cv: `If you type "cv" and hit the enter you'll download my CV to your device`,
  };

  const interval = setInterval(() => {
    if (document.getElementById("custom-text-area-background") !== null) {
      document.getElementById("custom-text-area-background")?.focus();
    }
  }, 1000);

  const HelpCommandWriter = (index: number) => {
    if (index < commands.length) {
      setTimeout(() => {
        console.log(index);
        let parent = document.createElement("div");
        parent.classList.add(styles["faded"], styles["help-padding"]);
        let temp_parent = document.createElement("div");
        temp_parent.classList.add(styles["help-parent"]);
        let title = document.createElement("div");
        title.classList.add(styles["help-title"]);
        title.textContent = commands[index];
        let description = document.createElement("div");
        description.textContent = help_contents[commands[index]];
        temp_parent.appendChild(title);
        temp_parent.appendChild(description);
        parent.appendChild(temp_parent);
        document.getElementById("before-commands")?.appendChild(parent);
        let _index = index + 1;

        HelpCommandWriter(_index);
      }, 50);
    }
  };
  const doCommands = async (command: string) => {
    console.log(command);

    switch (command) {
      case "help":
        HelpCommandWriter(0);

        break;
      case "clear":
        let parent = document.getElementById("before-commands");
        let child_length = parent?.childElementCount;
        if (child_length !== null && child_length !== undefined) {
          console.log(child_length);
          let child_nodes = [];
          for (let i = 0; i < child_length; i++) {
            child_nodes.push(parent?.children.item(i));

            if (i === child_length - 1) {
              for (let j = 0; j < child_nodes.length; j++) {
                child_nodes[j]?.remove();
              }
            }
          }
        }

        break;

      case "whoami":
        addSpacing();
        let whoamiparent = document.createElement("div");
        whoamiparent.classList.add(styles["faded"], styles["help-padding"]);
        whoamiparent.textContent = `Actually, I'm not quite sure how to describe myself without coding. 
        I am generally a realistic person. I love listening to music, drinking coffee (especially espresso) and playing chess. 
        Apart from programming, I usually play strategy-based games on the computer.`;
        document.getElementById("before-commands")?.appendChild(whoamiparent);
        addSpacing();
        break;

      case "cv":
        addSpacing();
        let cvparent = document.createElement("div");
        cvparent.classList.add(styles["faded"], styles["help-padding"]);
        cvparent.textContent = "Your file download has started.";
        document.getElementById("before-commands")?.appendChild(cvparent);
        let cv_download_elem = document.createElement("a");
        cv_download_elem.href = "./muhammed-metehan-yildirim.pdf";
        cv_download_elem.download = "muhammed-metehan-yildirim.pdf";
        cv_download_elem.click();
        addSpacing();
        break;

      default:
        break;
    }
  };

  const addText = (text: string) => {
    let _div = document.createElement("div");
    _div.classList.add(styles["help-padding"]);
    _div.innerHTML = text;
    document.getElementById("before-commands")?.appendChild(_div);
  };
  const addSpacing = () => {
    let spacing = document.createElement("div");
    spacing.classList.add(styles["spacing-div"]);
    document.getElementById("before-commands")?.appendChild(spacing);
  };

  const addStarterText = () => {
    let _div = document.createElement("div");
    _div.classList.add(styles["faded"], styles["help-padding"]);
    _div.textContent = `Welcome to my portfolio. If you are new here, please use the "help" command.`;
    document.getElementById("before-commands")?.appendChild(_div);
  };

  useEffect(() => {
    doCommands("clear");
    addStarterText();
    addSpacing();
  }, []);
  return (
    <div className={`${styles.terminal}`}>
      <div id="before-commands"></div>
      <textarea
        id="custom-text-area-background"
        className={`${styles["hidden-textarea"]}`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (text.trim() !== "") {
              const maybeCommand = text.trim().toLowerCase();
              if (
                typeof maybeCommand === "string" &&
                commands.includes(maybeCommand as type_for_assignment)
                // text.trim().toLowerCase() === "c"
              ) {
                doCommands(text.trim().toLowerCase());
                addSpacing();
              } else {
                if (text.trim().toLowerCase() === "c") {
                  doCommands("clear");
                } else {
                  let notFoundElem = document.createElement("div");
                  notFoundElem.classList.add(
                    styles["faded"],
                    styles["not-found"]
                  );
                  notFoundElem.innerHTML = `command <span class="${
                    styles["command-not-found-span"]
                  }"> ${
                    " " + text.trim() + " "
                  } </span> not found. Please type 'help' for command list`;
                  document
                    .getElementById("before-commands")
                    ?.appendChild(notFoundElem);
                  addSpacing();
                }
              }
            } else {
              var emptyElem = document.createElement("div");
              document
                .getElementById("before-commands")
                ?.appendChild(emptyElem);
              addSpacing();
            }
            setTimeout(() => {
              setText("");
              document.getElementById("cursor-bar")?.scrollIntoView();
            }, 150);
          }
        }}
        autoFocus={true}
        onBlur={() => {
          document.getElementById("custom-text-area-background")?.focus();
        }}
        cols={30}
        rows={10}
      ></textarea>
      <p id="command-section">
        <span className={`${styles["span_name"]}`}>stormcloud</span>
        <span className={`${styles["span_seperator"]}`}>@</span>
        <span className={`${styles["span_directory"]}`}>root</span>

        <span id="command" className={`${styles["command-area"]}`}>
          {text}
        </span>
        <area id="cursor-bar" className={`${styles["cursor"]}`}></area>
      </p>
    </div>
  );
}
