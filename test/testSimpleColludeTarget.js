const SimpleColludeTarget = artifacts.require("SimpleColludeTarget");

contract("SimpleColludeTarget", accounts => {
  it("...should store the value 1000.", async () => {
    const simpleColludeTargetInstance = await SimpleColludeTarget.deployed();

    // Set value of 1000
    await simpleColludeTargetInstance.setValue(1000, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleColludeTargetInstance.getValue.call();

    assert.equal(storedData, 1000, "The value 1000 was not stored.");
  });
});
