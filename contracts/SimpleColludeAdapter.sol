pragma solidity >=0.4.21 <0.6.0;

import "./BaseCollude.sol";

contract SimpleColludeAdapter {
    BaseCollude baseCollude;

    function createDeal(
        address payable _beneficiary, uint64 _expiryBlock,
        address _targetContract,
        uint256 _targetValue) public payable {

        bytes memory _targetCallData = abi.encodeWithSignature("getValue()");
        bytes memory _targetResponse = abi.encodePacked(_targetValue);

        baseCollude.createDeal.value(msg.value)(_beneficiary, _expiryBlock,
            _targetContract, _targetCallData, _targetResponse);
    }

    function setBaseCollude(address _address) public {
        baseCollude = BaseCollude(_address);
    }
}