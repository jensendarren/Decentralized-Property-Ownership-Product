var Verifier = artifacts.require('verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var { proof, inputs } = require('./proof.json');
const truffleAssert = require('truffle-assertions');
const truffleAssertions = require('truffle-assertions');

contract('SolnSquareVerifier contract', accounts => {
    const owner = accounts[0];
    const tokenOwner1 = accounts[1];
    const tokenId1 = 8;
    const name = 'KH_PROPERTY_TOKEN';
    const symbol = 'KHPT';
    const badInputs = [
      '0x0000000000000000000000000000000000000000000000000000000000000001',
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    ]
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

        it('should be possible to submit a solution which also emits a SolutionSubmitted', async () => {
          let key = await solnSquareVerifier.submitSolution.call(proof.a, proof.b, proof.c, inputs, {from: tokenOwner1});
          let tx = await solnSquareVerifier.submitSolution(proof.a, proof.b, proof.c, inputs, {from: tokenOwner1});
          let submittedSolution = await solnSquareVerifier.solutions(key);
          expect(submittedSolution.prover).to.be.eq(tokenOwner1)
          expect(parseInt(submittedSolution.index)).to.be.eq(1)
          expect(submittedSolution.valid).to.be.true
          truffleAssert.eventEmitted(tx, 'SolutionSubmitted', (e) => {
            return e.key == key && e.prover == tokenOwner1;
          })
        })

        it('should not be possible to submit the same solution by the same prover more than once', async () => {
          await truffleAssert.reverts(
            solnSquareVerifier.submitSolution(proof.a, proof.b, proof.c, inputs, {from: tokenOwner1}),
            "Solution already submitted by prover."
          )
        })

        it('should not be possible to submit a non-valid solution', async () => {
          await truffleAssert.reverts(
            solnSquareVerifier.submitSolution(proof.a, proof.b, proof.c, badInputs, {from: tokenOwner1}),
            "Solution is not valid."
          )
        })
    })
})