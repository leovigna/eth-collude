pragma solidity ^0.5.0;

contract SimpleColludeBountyHunter {

    function attack(address targetContract, uint256 targetValue, address bountyContract, uint256 bountyId) public {

        // Set bounty target value
        (bool success,) = targetContract.call(abi.encodeWithSignature("setValue(uint256)", targetValue));
        require(success, "Failed to set targetContract.");
        // Trigger bounty get reward
        (bool success2,) = bountyContract.call(abi.encodeWithSignature("settleDeal(uint256)", bountyId));
        require(success2, "Failed to collect bounty.");
    }

}