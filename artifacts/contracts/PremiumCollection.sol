// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PremiumCollection {
    IERC20 public token;
    address public admin;

    mapping(address => uint256) public premiumsPaid;

    constructor(address _token) {
        token = IERC20(_token);
        admin = msg.sender;
    }

    function payPremium(uint256 _amount) public {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        premiumsPaid[msg.sender] += _amount;
    }

    function withdraw(uint256 _amount) public {
        require(msg.sender == admin, "Only admin can withdraw");
        require(token.transfer(admin, _amount), "Transfer failed");
    }
}
