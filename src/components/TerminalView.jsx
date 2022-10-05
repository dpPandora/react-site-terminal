import { useState, useEffect } from "react";

function TerminalView() {
  const [input, setInput] = useState('$ ');
  const [output, setOutput] = useState('');

  const [inputPosition, setInputPosition] = useState(16);

  const updateInput = event => {
    let newInput = '$ ' + event.target.value.slice(2,);
    setInput(newInput);
  }

  //ill replace this later with a process command function that will contact an api :3
  const enterCommand = event => {
    if(event.key === 'Enter') {
      let command = input.slice(2,);
      let newOutput = output + '$ ' + input.slice(2,) + '\n';
      
      if (inputPosition < 512) {
        setInputPosition(inputPosition + 20);
      }
      else {
        let newNewOutput = newOutput.split('\n');
        newNewOutput.shift();
        newOutput = newNewOutput.join('\n');
      }
      
      setOutput(newOutput);

      setInput('$ ');
    }
  }

  return (
    <div className="terminal-view" >
      <input 
        style={{ top: inputPosition}}
        className="terminal-input font-standard"
        value={input}
        onChange={updateInput}
        onKeyDown={enterCommand}
      />
      <pre className="terminal-output font-standard">{output}</pre>
    </div>
  )
}

export default TerminalView;

/**
 * TODO:
 * - rearrange the input and output, hopefuly then input will automatically follow the end of output instead of the janky solution ive got now
 * - remake the "enterCommand" function so that it can be easily attapted for axios
 */