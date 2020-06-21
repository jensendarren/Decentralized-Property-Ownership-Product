let VerifierContract = artifacts.require('Verifier');
var { proof, inputs } = require('./proof.json');
const truffleAssert = require('truffle-assertions');

contract('Zokrates Verifier Contract', accounts => {

  const owner = accounts[0];
  const badInputs = [
    '0x0000000000000000000000000000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000000000000000000000000000001'
  ]
  let verifier;

  describe('verification', function () {
    before(async () => {
      verifier = await VerifierContract.new({from: owner});
    })
    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    it('verifies correct proof as true', async () => {
      expect(await verifier.verifyTx.call(proof.a, proof.b, proof.c, inputs)).to.be.true;
    })
    it('emits Verified event when transaction is verified', async () => {
      let res = await verifier.verifyTx(proof.a, proof.b, proof.c, inputs)
      truffleAssert.eventEmitted(res, 'Verified', (e) => {
        return e.s == 'Transaction successfully verified.';
      })
    })
    // Test verification with incorrect proof
    it('verifies incorrect proof as false', async () => {
      expect(await verifier.verifyTx.call(proof.a, proof.b, proof.c, badInputs)).to.be.false;
    })
  })
})


