import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Privacy = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract Privacy {
  
    bool public locked = true;
    uint256 public ID = block.timestamp;
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    uint16 private awkwardness = uint16(block.timestamp);
    bytes32[3] private data;
  
    constructor(bytes32[3] memory _data) {
      data = _data;
    }
    
    function unlock(bytes16 _key) public {
      require(_key == bytes16(data[2]));
      locked = false;
    }


    A bunch of super advanced solidity algorithms...
  }`;

  const solutionCode = `
  key = await web3.eth.getStorageAt(contract.address, 5)

  // We need only 16 bytes of key, so include 0x we need 34 items (each 2 item equal to 1 byte)
  key = key.slice(0, 34)

  await contract.unlock(key)
  `

  return (
    <div>
      <h1 className="headerText">Privacy</h1>
      <div className="content">
        <div className="highlighterHeader">
          <p className="smallText"> Example code</p>
          {copy ? (
            <button className="copyButton">
              <span>
                <AiOutlineFileDone />
              </span>
              Copied!
            </button>
          ) : (
            <button
              className="copyButton"
              onClick={() => {
                navigator.clipboard.writeText(codeString);
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 3000);
              }}
            >
              <span>
                <AiFillCopy />
              </span>
              Copy Code
            </button>
          )}
        </div>
        <SyntaxHighlighter
          language="solidity"
          style={atomOneDark}
          customStyle={{
            padding: "25px",
            borderRadius: "0.375rem",
          }}
          wrapLongLines={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
      <div className="textBox">
        <TextDiv
          title="Hack"
          text="locked is 1 byte bool in slot 0
          ID is 256bit and in slot 1 
          flattenin is 8bit, denomination also 8 bit, and awkwardness 16bit, all these in slot3
          Array data always start a new slot, so it stored in 3 slot, index 1 element at 4 slot, and index 2 at slot 5
          ."
        />
      </div>
      <SyntaxHighlighter
        language="solidity"
        style={atomOneDark}
        customStyle={{
          padding: "25px",
          borderRadius: "0.375rem",
        }}
        wrapLongLines={true}
      >
        {solutionCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default Privacy;
