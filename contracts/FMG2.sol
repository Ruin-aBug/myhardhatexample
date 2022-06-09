// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FMG2 is Ownable {
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
    uint256 shareamount = 0.01 ether; //默认瓜分额
    uint256 one = 1 ether;

    address[] public partition = [0x01df6f797Cc34957C9764e0043aba35B073B9ae5
    ];
    uint256[] public partitionRatio = [5, 10, 10, 10, 10, 10, 10, 3, 30, 2];

    receive() external payable {}

    //设置瓜分ETH
    function setEth(uint256 _eth) public onlyOwner {
        shareamount = _eth;
    }

    //获取开关状态
    function getEth() public view returns (uint256) {
        return shareamount;
    }

    //瓜分账户
    function getPartition() public view returns (address[] memory) {
        return partition;
    }

    //瓜分比例
    function getPartitionRatio() public view returns (uint256[] memory) {
        return partitionRatio;
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

    //转账
    function transferAccounts(address _address, uint256 num) private {
        // require(num >= 0 , "num 0!");//最小限制
        require(num >= 0 && num < 1 ether, "num 1!"); //最大限制
        payable(_address).transfer(num);
    }

    //进行分账
    function fashionable() public onlyOwner {
        uint256 amount;
        require(!locked, " lock!"); //防止攻击
        amount = getOwnerBlance();
        uint256 _shareamount = shareamount;
        require(
            amount >= _shareamount,
            "Can divide the amount is insufficient"
        );
        address[] memory _partition = partition;
        uint256[] memory _partitionRatio = partitionRatio;
        locked = true;
        for (uint256 i = 0; i < partition.length; i++) {
            transferAccounts(
                _partition[i],
                (_shareamount * _partitionRatio[i]) / 100
            );
        }
        // transferAccounts(payable(partition[0]),shareamount*partitionRatio[0]/100);
        // transferAccounts(payable(partition[1]),shareamount*partitionRatio[1]/100);
        // transferAccounts(payable(partition[2]),shareamount*partitionRatio[2]/100);
        // transferAccounts(payable(partition[3]),shareamount*partitionRatio[3]/100);
        // transferAccounts(payable(partition[4]),shareamount*partitionRatio[4]/100);
        // transferAccounts(payable(partition[5]),shareamount*partitionRatio[5]/100);
        // transferAccounts(payable(partition[6]),shareamount*partitionRatio[6]/100);
        // transferAccounts(payable(partition[7]),shareamount*partitionRatio[7]/100);
        // transferAccounts(payable(partition[8]),shareamount*partitionRatio[8]/100);
        // transferAccounts(payable(partition[9]),shareamount*partitionRatio[9]/100);

        locked = false;
    }
}
