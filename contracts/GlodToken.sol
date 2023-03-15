//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract GlodToken is ERC20 {
    IERC20 public MANA;
    address public owner;

    constructor(uint256 amount, address manaAddr) ERC20("GlodToken", "GDT") {
        _mint(msg.sender, amount);
        owner = msg.sender;
        MANA = IERC20(manaAddr);
    }

    function setOwner(address _owner) public {
        require(msg.sender == owner, "change error");
        owner = _owner;
    }

    function setMANA(address mana) public {
        require(msg.sender == owner, "change error");
        MANA = IERC20(mana);
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == owner, "mint error");
        require(account != address(0), "address is zero");
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        require(account == msg.sender, "burn error");
        _burn(account, amount);
    }

    function exchange(address account, uint256 amount) public {
        require(account != address(0), "account is zero");
        require(amount > 0, "amount 0");
        SafeERC20.safeTransferFrom(MANA, msg.sender, address(this), amount);
        _mint(account, amount);
    }
}
