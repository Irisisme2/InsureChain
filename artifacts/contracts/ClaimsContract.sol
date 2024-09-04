// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./PolicyContract.sol"; 
contract ClaimsContract {
    struct Claim {
        string policyNumber;
        address claimant;
        uint256 amountClaimed;
        bool isProcessed;
    }

    mapping(string => Claim) public claims;

    PolicyContract policyContract;

    constructor(address _policyContract) {
        policyContract = PolicyContract(_policyContract);
    }

    function fileClaim(
        string memory _policyNumber,
        uint256 _amountClaimed
    ) public {
        PolicyContract.Policy memory policy = policyContract.getPolicy(_policyNumber);
        require(policy.policyHolder == msg.sender, "Not the policy holder");
        require(policy.isActive, "Policy is not active");

        claims[_policyNumber] = Claim({
            policyNumber: _policyNumber,
            claimant: msg.sender,
            amountClaimed: _amountClaimed,
            isProcessed: false
        });
    }

    function processClaim(string memory _policyNumber) public {
        Claim storage claim = claims[_policyNumber];
        require(!claim.isProcessed, "Claim already processed");

        PolicyContract.Policy memory policy = policyContract.getPolicy(_policyNumber);
        require(policy.isActive, "Policy is not active");

        // Implement logic to transfer funds based on the claim amount
        claim.isProcessed = true;
    }
}
