//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RuinToken is ERC20, Ownable {
    constructor(uint256 amount) ERC20("RuinToken", "RUIN") Ownable() {
        _mint(msg.sender, amount);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "address is zero");
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        require(account == msg.sender, "burn error");
        _burn(account, amount);
    }
}
