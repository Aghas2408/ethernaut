
logo
This level is not translated or translation is incomplete.Click here to improve the translation

●●●●○

Privacy



Nothing in the ethereum blockchain is private. The keyword private is merely an artificial construct of the Solidity language. Web3's getStorageAt(...) can be used to read anything from storage. It can be tricky to read what you want though, since several optimization rules and techniques are used to compact the storage as much as possible.

It can't get much more complicated than what was exposed in this level. For more, check out this excellent article by "Darius": How to read Ethereum contract storage

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {

  bool public locked = true;
  uint256 public ID = block.timestamp;
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(block.timestamp);
  bytes32[3] private data;

  constructor(bytes32[3] memory _data) {
    data = _data;
  }
  
  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2]));
    locked = false;
  }

  /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}

// locked is 1 byte bool in slot 0
// ID is a 32 byte uint256. It is 1 byte extra big to be inserted in slot 0. 
// So it goes in & totally fills slot 1
// flattening - a 1 byte uint8, denomination - a 1 byte uint8 and awkwardness - a 2 byte uint16 totals 4 bytes. 
// So, all three of these go into slot 2
// Array data always start a new slot, so data starts from slot 3. 
// Since it is bytes32 array each value takes 32 bytes.
// Hence value at index 0 is stored in slot 3, 
// index 1 is stored in slot 4 and index 2 value goes into slot 5
// So we need to get value stored in slot 5
// key = await web3.eth.getStorageAt(contract.address, 5)
// key = key.slice(0, 34), because of in unlock function it is comparing only first 16 bytes, 
// we need to truncate it