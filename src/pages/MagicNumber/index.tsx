import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const MagicNumber = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract MagicNum {
  
    address public solver;
  
    constructor() {}
  
    function setSolver(address _solver) public {
      solver = _solver;
    }
  
    /*
      ____________/\\\_______/\\\\\\\\\_____        
       __________/\\\\\_____/\\\///////\\\___       
        ________/\\\/\\\____\///______\//\\\__      
         ______/\\\/\/\\\______________/\\\/___     
          ____/\\\/__\/\\\___________/\\\//_____    
           __/\\\\\\\\\\\\\\\\_____/\\\//________   
            _\///////////\\\//____/\\\/___________  
             ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
              ___________\///_____\///////////////__
    */
  }`;

  const solutionCode = `
  const bytecode = "600a600c600039600a6000f3602a60505260206050f3"

  txn = await web3.eth.sendTransaction({from: player, data: bytecode})

  await contract.setSolver(txn.contractAddress)

  Also we can deploy this bytecode with create opcode and return the address of created contract.
`;

  return (
    <div>
      <h1 className="headerText">Magic Number</h1>
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
          text="
                We just need to load 42 value in storaga and after that return it, all this will be in bytecode,
                And also we need to add simple init code for copy bytecode to the memory and return to the EVM.
          "
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

export default MagicNumber;
