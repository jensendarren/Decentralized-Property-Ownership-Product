const Pausable = artifacts.require('Pausable');
const truffleAssert = require('truffle-assertions');

contract('Ownable Contract', accounts => {

  const owner = accounts[0];
  const newOwner = accounts[1];
  const notAnOwner = accounts[2];

  let pausable;
})