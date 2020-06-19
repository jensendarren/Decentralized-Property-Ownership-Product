// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var Verifier = artifacts.require('verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
// const truffleAssert = require('truffle-assertions');

contract('SolnSquareVerifier contract', accounts => {
    const owner = accounts[0];
    const tokenOwner1 = accounts[1];
    const tokenId1 = 8;
    const name = 'KH_PROPERTY_TOKEN';
    const symbol = 'KHPT';
    let solnSquareVerifier;
    let verifier;

    describe('adding proof solutions to the contract', function () {
        before(async () => {
          verifier = await Verifier.new({from: owner});
          solnSquareVerifier = await SolnSquareVerifier.new(verifier.address, name, symbol, {from: owner});
        })

        it('should be able to check the metadata', async () => {
          expect(await solnSquareVerifier.name()).to.be.eq(name);
          expect(await solnSquareVerifier.symbol()).to.be.eq(symbol);
      })
    })
  })