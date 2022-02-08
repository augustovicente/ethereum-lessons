pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Commit is ERC1155, Ownable
{
    uint256 public last_id = 0;

    mapping(string => uint256) public commits;

    constructor() ERC1155("") {}

    function setURI(string memory newuri) public onlyOwner
    {
        _setURI(newuri);
    }

    function uri(string memory commit) public view returns (string memory)
    {
        return (
            string(abi.encodePacked(
                "http://localhost:3000/",
                Strings.toString(commits[commit])
            ))
        );
    }

    function owner_mint(address account, uint256 amount, string memory data) public onlyOwner
    {
        if(last_id > 0)
        {
            // incrementando quando necessário
            last_id++;
            // mintando
            _mint(account, last_id, amount, "");
            // armazenando o novo commit
            commits[data] = last_id;
        }
        else
        {
            // mintando
            _mint(account, last_id, amount, "");
            commits[data] = last_id;
            // incrementando quando necessário
            last_id++;
        }
    }

    function mint(uint256 amount, string memory data) public payable
    {
        require(msg.value >= 0.1 ether, "To register the commit you should pay at least 0.1 ether");

        if(last_id > 0)
        {
            // incrementando quando necessário
            last_id++;
            // mintando
            _mint(msg.sender, last_id, amount, "");
            // armazenando o novo commit
            commits[data] = last_id;
        }
        else
        {
            // mintando
            _mint(msg.sender, last_id, amount, "");
            commits[data] = last_id;
            // incrementando quando necessário
            last_id++;
        }
    }
}