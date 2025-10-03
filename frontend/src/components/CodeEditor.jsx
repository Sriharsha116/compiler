import { useEffect, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
// import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import "../components/css/codeEditor.css";

function CodeEditor({ language, onChangeLanguage, value, onChangeValue }) {
  useEffect(() => {
    const defaultCode = {
      javascript: 'console.log("hello world");',
      python: 'print("hello world")',
      cpp: `#include <iostream>
using namespace std;

int main() {
  
    cout << "Hello World";
    return 0;
}`,
    };

    onChangeValue(defaultCode[language]);
  }, [language, onChangeValue]);

  const onChange = useCallback(
    (val) => {
      console.log("CodeMirror value updated:", val);
      onChangeValue(val);
    },
    [onChangeValue]
  );

  const getLanguageExtension = (language) => {
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "python":
        return python();
      case "cpp":
        return cpp();
      default:
        return javascript({ jsx: true });
    }
  };

  return (
    <div className="code-editor-container">
      <div className="select-container">
        <select
          value={language}
          onChange={(e) => onChangeLanguage(e.target.value)}
          className="language-selector"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <CodeMirror
        value={value}
        theme={tokyoNight}
        extensions={[getLanguageExtension(language)]}
        onChange={onChange}
        style={{
          height: "50vh",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default CodeEditor;
