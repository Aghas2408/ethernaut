// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneCaller {
    address public telephoneAddress;

    constructor(address _telephoneAddress) {
        telephoneAddress = _telephoneAddress;
    }

    function callTelephoneContract(address _newOwner) external {
        ITelephone(telephoneAddress).changeOwner(_newOwner);
    }
}
