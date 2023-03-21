// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

// We need to call this method with another contract, then the tx.origin will be our address
// and msg.sender address of caller contract, see TelephoneCaller
// await contract.owner().then(v => v.toString())