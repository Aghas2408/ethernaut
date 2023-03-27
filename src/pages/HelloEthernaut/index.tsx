import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const HelloEthernaut = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract Instance {
  
    string public password;
    uint8 public infoNum = 42;
    string public theMethodName = 'The method name is method7123949.';
    bool private cleared = false;
  
    // constructor
    constructor(string memory _password) {
      password = _password;
    }
  
    function info() public pure returns (string memory) {
      return 'You will find what you need in info1().';
    }
  
    function info1() public pure returns (string memory) {
      return 'Try info2(), but with "hello" as a parameter.';
    }
  
    function info2(string memory param) public pure returns (string memory) {
      if(keccak256(abi.encodePacked(param)) == keccak256(abi.encodePacked('hello'))) {
        return 'The property infoNum holds the number of the next info method to call.';
      }
      return 'Wrong parameter.';
    }
  
    function info42() public pure returns (string memory) {
      return 'theMethodName is the name of the next method.';
    }
  
    function method7123949() public pure returns (string memory) {
      return 'If you know the password, submit it to authenticate().';
    }
  
    function authenticate(string memory passkey) public {
      if(keccak256(abi.encodePacked(passkey)) == keccak256(abi.encodePacked(password))) {
        cleared = true;
      }
    }
  
    function getCleared() public view returns (bool) {
      return cleared;
    }
  }`;

  const solutionCode = `
  await contract.info()

  // Output: 'You will find what you need in info1().'

  await contract.info1()

  // Output: 'Try info2(), but with "hello" as a parameter.'

  await contract.info2("hello")

  // Output: 'The property infoNum holds the number of the next info method to call.'

  await contract.infoNum().then(v => v.toString())

  // Output: 42

  await contract.info42()

  // Output: 'theMethodName is the name of the next method.'

  await contract.theMethodName()

  // Output: 'The method name is method7123949.'

  await contract.method7123949()

  // Output: 'If you know the password, submit it to authenticate().'

  await contract.password()

  // Output: 'ethernaut0'

  await contract.authenticate('ethernaut0')
  // Very easy level
`;

  return (
    <div>
      <h1 className="headerText">Hello Ethernaut</h1>
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
          text="For start this project we just need to open console and write commans below."
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

export default HelloEthernaut;
