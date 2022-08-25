//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract  Transaction{

    uint public fee = 0.0001 ether;
    uint public amount;
    uint public firstTeam = 0;
    uint public secondTeam = 0;
    mapping(uint =>address) public TeamToAddress;
    function Firstplayer(uint team1,uint team2) public payable
    {
        require(msg.value >= 0.01 ether,"Need Some more Amount For Bet"); 
        firstTeam = team1;
        secondTeam = team2;
        TeamToAddress[firstTeam]=msg.sender;
        amount=msg.value;
    }
    function SecondPlayer() public payable
    {
        require(msg.value == amount,"Please Enter a Valid Bet Amount");
        TeamToAddress[secondTeam] = msg.sender;
    }

    function BetAmount() public view  returns(uint)
    {
        return amount;
    }

    function DeclareBet(uint team) payable public
    {
        address _winner;
        if(secondTeam==0)
        {
                _winner = TeamToAddress[firstTeam];
        }
        else{
            _winner = TeamToAddress[team];
        }
        payable(_winner).transfer(address(this).balance);
    }
}
