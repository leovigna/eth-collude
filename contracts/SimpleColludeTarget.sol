pragma solidity >=0.4.21 <0.6.0;

contract SimpleColludeTarget {
    uint256 private value;

    function setValue(uint256 _value) public returns (bool) {
        value = _value;
        return true;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}