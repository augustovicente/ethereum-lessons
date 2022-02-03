pragma solidity ^0.8.9;
 
contract Lottery {
    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value >= 0.1 ether, "You must enter the lottery with at least 0.1 ether");

        players.push(msg.sender);
    }

    function random() private view returns (uint){
        keccak256(abi.encodePacked(block.difficulty, block.timestamp, players));
    }

    function pickWinner() public{
        uint winner = random() % players.length;
        payable(players[winner]).transfer(address(this).balance);
        players = new address[](0);
    }
}