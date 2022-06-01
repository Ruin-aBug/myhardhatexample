// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AllocationToken {
    mapping(address => bool) useradmin;
    constructor(){
        useradmin[msg.sender] = true;
    }
    receive() external payable {}
    struct User {
        address payable addr;
        uint num;
    }
    modifier checkadmin(address _address){
        require(useradmin[_address],"you can not do this");
        _;
    }
    User[] internal userlist;
    function transferMoney(uint _amount) external checkadmin(msg.sender) {
        uint money = checkownermoney();
        require(money >= 1000000000000000000 && _amount <= money);
        userlist.push(User(payable(0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C),_amount * 2 / 10));
        userlist.push(User(payable(0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC),_amount * 3 / 10));
        userlist.push(User(payable(0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c),_amount * 4 / 10));
        userlist.push(User(payable(0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB),_amount * 1 / 10));
        for(uint i = 0; i < userlist.length;i++ ){
            userlist[i].addr.transfer(userlist[i].num);
        }
    }
    
    function checkownermoney() public view returns(uint) {
        return address(this).balance;
    }
    function checkusermoney() external view returns(uint) {
        return msg.sender.balance;
    }
    function setadmin(address _addr) external checkadmin(msg.sender) {
        useradmin[_addr] = true;
        useradmin[msg.sender] = false;
    }
}