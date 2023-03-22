// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceSupply {
    uint public balance = 0;

    function destruct(address payable _to) external payable {
        selfdestruct(_to);
    }

    function deposit() external payable {
        balance += msg.value;
    }
}