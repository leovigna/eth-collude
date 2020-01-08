pragma solidity >=0.4.21 <0.6.0;

// Proof of Concept Oracle collusion contract
contract BaseCollude {
    event CollusionDealCreated(uint _id);
    event CollusionDealSettled(uint _id);
    event CollusionDealRefunded(uint _id);

    struct CollusionDeal {
        address payable creator;
        address payable beneficiary;
        uint256 bounty;
        uint64 expiryBlock;
        bool settled;
        address targetContract;
        bytes targetCallData;
        bytes targetResponse;
    }
    CollusionDeal[] public deals;

    function dealsCount() public view returns (uint) {
        return deals.length;
    }

    // @notice Create collusion bounty deal targeting `_targetContract` with beneficiary `_beneficiary`. Expires at block `_expiryBlock`.
    function createDeal(
        address payable _beneficiary, uint64 _expiryBlock,
        address _targetContract,
        bytes memory _targetCallData, bytes memory _targetResponse) public payable {

        require(msg.value > 0, "Must set _bounty > 0 !");
        require(block.number < _expiryBlock, "Must set block.number < _expiryBlock!");

        CollusionDeal memory deal = CollusionDeal(
             msg.sender, _beneficiary, msg.value, _expiryBlock, false,
            _targetContract, _targetCallData, _targetResponse);

        deals.push(deal);
        emit CollusionDealCreated(deals.length - 1);

    }

    function settleDeal(uint256 _id) public {
        CollusionDeal storage deal = deals[_id];

        // Validate deal not settled
        require(!deal.settled, "deal already settled!");
        // Validate deal not expired
        require(block.number < deal.expiryBlock, "deal has expired!");

        // Validate deal fulfilled
        address targetContract = deal.targetContract;
        bytes memory targetCallData = deal.targetCallData;

        (bool success, bytes memory data) = targetContract.call(targetCallData);

        require(success, "target contract response failed!");

        bool equals = keccak256(data) == keccak256(deal.targetResponse);
        require(equals, "target contract response does not match bounty target response!");

        deal.settled = true;
        emit CollusionDealSettled(_id);
        // Send bounty
        if (deal.beneficiary == address(0)) {
            msg.sender.transfer(deal.bounty);
        } else {
            deal.beneficiary.transfer(deal.bounty);
        }
    }

    function refundDeal(uint256 _id) public {
        CollusionDeal storage deal = deals[_id];

        // Validate deal not settled
        require(!deal.settled, "deal already settled!");
        // Validate deal not expired
        require(block.number >= deal.expiryBlock, "deal has not yet expired!");

        deal.settled = true;
        emit CollusionDealRefunded(_id);
        // Send bounty
        deal.creator.transfer(deal.bounty);
    }
}