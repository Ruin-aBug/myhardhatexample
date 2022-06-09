// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FMG1 is Ownable {
    constructor() {}

    string private _name = "FMG";
    string private _symbol = "FMG";

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    //合约分账
    bool private locked = false; //转账开关
    uint256 shareamount = 0.01 * 10**18; //默认瓜分额

    address[] public partition = [0x01df6f797Cc34957C9764e0043aba35B073B9ae5
    ];
    uint256[] public partitionRatio = [5, 10, 10, 10, 10, 10, 10, 3, 30, 2];

    receive() external payable {}

    //设置瓜分ETH
    function setEth(uint256 _eth) public onlyOwner {
        shareamount = _eth * 10**18;
    }

    //获取开关状态
    function getEth() public view returns (uint256) {
        return shareamount;
    }

    //瓜分账户
    function getPartition() public view returns (address[] memory) {
        return (partition);
    }

    //瓜分比例
    function getPartitionRatio() public view returns (uint256[] memory) {
        return (partitionRatio);
    }

    //修改瓜分比例
    function setPartition(address _setAddress, uint256 _proportion)
        public
        returns (address, uint256)
    {
        for (uint256 i = 0; i < partition.length; i++) {
            if (partition[i] == _setAddress) {
                partitionRatio[i] = _proportion;
            }
        }
        return (_setAddress, _proportion);
    }

    //查询地址比例
    function lookPartition(address _lookAddress)
        public
        view
        returns (address, uint256)
    {
        for (uint256 i = 0; i < partition.length; i++) {
            if (_lookAddress == partition[i]) {
                return (_lookAddress, partitionRatio[i]);
            }
        }
        return (_lookAddress, 0);
    }

    //设置开关
    function setLocked(bool _locked) public onlyOwner {
        locked = _locked;
    }

    //获取开关状态
    function getLocked() public view returns (bool) {
        return locked;
    }

    //获取金额
    function getUserBalance(address _address) public view returns (uint256) {
        return _address.balance;
    }

    function getOwnerBlance() public view returns (uint256) {
        return address(this).balance;
    }

    function getUserBlance() public view returns (uint256) {
        return msg.sender.balance;
    }

    event fashionableLog(
        address _from,
        address _to,
        uint256 _total,
        uint256 _ratio,
        uint256 _value
    );

    //转账
    function transferAccounts(address payable _address, uint256 num)
        private
        returns (uint256)
    {
        uint256 ff;
        require(num > 0, "num 0!"); //最小限制
        require(num < 1 * (10**18), "num 1!"); //最大限制
        ff = _address.balance;
        locked = true;
        _address.transfer(num);
        locked = false;
        ff = _address.balance;
        return ff;
    }

    //进行分账
    function fashionable() public onlyOwner {
        uint256 amount;
        require(!locked, " lock!"); //防止攻击
        amount = getOwnerBlance();
        require(amount >= shareamount, "Can divide the amount is insufficient");
        for (uint256 i = 0; i < partition.length; i++) {
            transferAccounts(
                payable(partition[i]),
                (shareamount * partitionRatio[i]) / 100
            );
            // emit fashionableLog(msg.sender,partition[i],shareamount,partitionRatio[i],shareamount*partitionRatio[i]/100);
        }
    }
}
