var Verifier = artifacts.require('verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var { proof, inputs } = require('./proof.json');
var { proof1, inputs1 } = require('./proof1.json');
const truffleAssert = require('truffle-assertions');
const truffleAssertions = require('truffle-assertions');

contract('SolnSquareVerifier contract', accounts => {
    const owner = accounts[0];
    const tokenOwner1 = accounts[1];
    const tokenOwner2 = accounts[2];
    const tokenId1 = 8;
    const name = 'KH_PROPERTY_TOKEN';
    const symbol = 'KHPT';
    const badInputs = [
      '0x0000000000000000000000000000000000000000000000000000000000000001',
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    ]
    let solnSquareVerifier;
    let verifier;
    let tokenOwner1SolutionKey;

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
          tokenOwner1SolutionKey = await solnSquareVerifier.submitSolution.call(proof.a, proof.b, proof.c, inputs, {from: tokenOwner1});
          let tx = await solnSquareVerifier.submitSolution(proof.a, proof.b, proof.c, inputs, {from: tokenOwner1});
          let submittedSolution = await solnSquareVerifier.solutions(tokenOwner1SolutionKey);
          expect(submittedSolution.prover).to.be.eq(tokenOwner1)
          expect(parseInt(submittedSolution.index)).to.be.eq(1)
          expect(submittedSolution.minted).to.be.false
          truffleAssert.eventEmitted(tx, 'SolutionSubmitted', (e) => {
            return e.key == tokenOwner1SolutionKey && e.prover == tokenOwner1;
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

      describe('minting NF tokens', () => {
        it('should not be possible to mint a token if a solution has not been provided', async () => {
          await truffleAssert.reverts(
            solnSquareVerifier.mintNFT(badInputs, tokenOwner1, {from: owner}),
            "Solution does not exist."
          )
        })

        it('should not be possible to mint a token if a different account submitted the solution', async  () => {
          await truffleAssert.reverts(
            solnSquareVerifier.mintNFT(inputs, tokenOwner2, {from: owner}),
            "Only solution prover can mint this token"
          )
        })

        it('should be possible to mint a new NFT token once a valid solution is added', async () => {
          let tokenOwner1SubmittedSolution = await solnSquareVerifier.solutions(tokenOwner1SolutionKey);
          // we expect the token not yet to be minted
          expect(tokenOwner1SubmittedSolution.minted).to.be.false
          let tx = await solnSquareVerifier.mintNFT(inputs, tokenOwner1, {from: owner});
          // after successful minting, the submitted solution should be marked as minted
          tokenOwner1SubmittedSolution = await solnSquareVerifier.solutions(tokenOwner1SolutionKey);
          expect(tokenOwner1SubmittedSolution.minted).to.be.true
          // the Transfer event should be emitted via the superclass
          truffleAssert.eventEmitted(tx, 'Transfer', (e) => {
            return  e.from == owner &&
                    e.to ==  tokenOwner1 &&
                    e.tokenId == 1;
          })
        })

        it('should not be possible to mint a token that is already minted', async () => {
          await truffleAssert.reverts(
             solnSquareVerifier.mintNFT(inputs, tokenOwner1, {from: owner}),
             "Token is already minted."
          )
        })

        it('should be possible to mint a different NFT token for a different valid solution', async () => {
          // submit a different, valid solution
          let key = await solnSquareVerifier.submitSolution.call(proof1.a, proof1.b, proof1.c, inputs1, {from: tokenOwner1});
          await solnSquareVerifier.submitSolution(proof1.a, proof1.b, proof1.c, inputs1, {from: tokenOwner1});
          // check that its been accepted and that the token is not yet minted
          soln = await solnSquareVerifier.solutions(key);
          expect(soln.minted).to.be.false
          // mint the token useing the solution inputs
          let tx = await solnSquareVerifier.mintNFT(inputs1, tokenOwner1, {from: owner});
          // check that the new token has been minted with the expected token id
          soln = await solnSquareVerifier.solutions(key);
          expect(soln.minted).to.be.true
          truffleAssert.eventEmitted(tx, 'Transfer', (e) => {
            return  e.from == owner &&
                    e.to ==  tokenOwner1 &&
                    e.tokenId == 2;
          })
        })
    })
  })
})