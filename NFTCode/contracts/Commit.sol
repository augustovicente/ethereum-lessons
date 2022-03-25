pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Commit is ERC1155, Ownable
{
    uint256 public last_id = 0;

    mapping(string => uint256) public commits;
    mapping(uint256 => string) public commits_inverse;

    constructor() ERC1155("") {}

    function setURI(string memory newuri) public onlyOwner
    {
        _setURI(newuri);
    }

    function uri(string memory commit) public view returns (string memory)
    {
        return (
            string(abi.encodePacked(
                "http://localhost:8080/commit-info/",
                commit
            ))
        );
    }
    function uri(uint256 commit_id) override public view returns (string memory)
    {
        return (
            string(abi.encodePacked(
                "http://localhost:8080/",
                commits_inverse[commit_id]
            ))
        );
    }

    function owner_mint(address account, uint256 amount, string memory data) public onlyOwner
    {
        // mintando
        _mint(account, last_id, amount, "");
        commits[data] = last_id;
        commits_inverse[last_id] = data;
        // incrementando quando necessário
        last_id++;
    }

    function mint(uint256 amount, string memory data) public payable
    {
        // require(msg.value >= 0.1 ether, "To register the commit you should pay at least 0.1 ether");
        // mintando
        _mint(msg.sender, last_id, amount, "");
        commits[data] = last_id;
        commits_inverse[last_id] = data;
        // incrementando quando necessário
        last_id++;
    }

    function mint_batch(string[] memory data) public payable
    {
        // require(msg.value >= 0.1 ether, "To register the commit you should pay at least 0.1 ether");
        uint[] memory ids = new uint[](data.length);
        uint[] memory amounts = new uint[](data.length);
        for(uint i = 0; i < (data.length); i++)
        {
            amounts[i] = 1;
            ids[i] = last_id;
            // armazenando o novo commit
            commits[data[i]] = last_id;
            commits_inverse[last_id] = data[i];
            last_id++;
        }
        // mintando
        _mintBatch(msg.sender, ids, amounts, "");
        // _mint(msg.sender, last_id, amount, "");
    }
}