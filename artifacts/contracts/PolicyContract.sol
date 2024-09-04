// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PolicyContract {
    struct Policy {
        string policyNumber;
        string policyType;
        uint256 amount;
        uint256 dueDate;
        string paymentMethod;
        address policyHolder;
        bool isActive;
    }

    mapping(string => Policy) public policies;

    function createPolicy(
        string memory _policyNumber,
        string memory _policyType,
        uint256 _amount,
        uint256 _dueDate,
        string memory _paymentMethod
    ) public {
        require(policies[_policyNumber].policyHolder == address(0), "Policy already exists");

        policies[_policyNumber] = Policy({
            policyNumber: _policyNumber,
            policyType: _policyType,
            amount: _amount,
            dueDate: _dueDate,
            paymentMethod: _paymentMethod,
            policyHolder: msg.sender,
            isActive: true
        });
    }

    function getPolicy(string memory _policyNumber) public view returns (Policy memory) {
        return policies[_policyNumber];
    }

    function deactivatePolicy(string memory _policyNumber) public {
        Policy storage policy = policies[_policyNumber];
        require(policy.policyHolder == msg.sender, "Not the policy holder");
        policy.isActive = false;
    }
}
