//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint256 private index;

    event MyEvent (
        address sender,
        uint256 index
    );

    event MyResetEvent (
        address sender,
        uint256 index
    );

    constructor() {
        index = 0;
    }

    function getIndex() public view returns (uint256) {
        return index;
    }

    function setIndex() public {
        index++;
        emit MyEvent(msg.sender, index);
    }

    function resetIndex() public {
        index = 0;
        emit MyResetEvent(msg.sender, index);
    }
}
