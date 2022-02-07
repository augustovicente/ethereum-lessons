// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NftCamsis is ERC1155
{
    uint256 public constant HB = 1;
    uint256 public constant PA = 2;
    uint256 public constant ML = 3;
    uint256 public constant AS = 4;

    constructor() ERC1155("https://bafybeicioq7suhuurpk7lnsripmg73rjhkajj4p6yslp76u7qeq6ldfcnq.ipfs.dweb.link/{id}.json") {
        _mint(msg.sender, HB, 1, "");
        _mint(msg.sender, PA, 1, "");
        _mint(msg.sender, ML, 1, "");
        _mint(msg.sender, AS, 1, "");
    }

    function uri(uint256 tokenId) override public view returns (string memory){
        return (
            string(abi.encodePacked(
                "https://bafybeicioq7suhuurpk7lnsripmg73rjhkajj4p6yslp76u7qeq6ldfcnq.ipfs.dweb.link/",
                Strings.toString(tokenId),
                ".json"
            ))
        );
    }
}