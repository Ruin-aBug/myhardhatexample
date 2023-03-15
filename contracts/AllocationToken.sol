// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AllocationToken {
    mapping(address => bool) useradmin;

    constructor() {
        useradmin[msg.sender] = true;
    }

    receive() external payable {}

    struct User {
        address payable addr;
        uint num;
    }
    modifier checkadmin(address _address) {
        require(useradmin[_address], "you can not do this");
        _;
    }

    // User[] internal userlist;
    function transferMoney(
        uint _amount,
        User[] memory userlist
    ) external checkadmin(msg.sender) {
        uint money = checkownermoney();
        require(money >= 1 ether && _amount <= money);
        for (uint i = 0; i < userlist.length; i++) {
            userlist[i].addr.transfer((_amount * userlist[i].num) / 10);
        }
    }

    function checkownermoney() public view returns (uint) {
        return address(this).balance;
    }

    function checkusermoney() external view returns (uint) {
        return msg.sender.balance;
    }

    function setadmin(address _addr) external checkadmin(msg.sender) {
        useradmin[_addr] = true;
        useradmin[msg.sender] = false;
    }
}
