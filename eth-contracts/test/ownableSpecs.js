const Ownable = artifacts.require('Ownable');
const truffleAssert = require('truffle-assertions');

contract('Ownable Contract', accounts => {

  const owner = accounts[0];
  const newOwner = accounts[1];
  const notAnOwner = accounts[2];

  let ownable;

  describe('ownership properties', function () {
    before(async () => {
      ownable = await Ownable.new({from: owner});
    })

    it('calling the constructor should emit a ContractOwnershipTransferEvent with a transfer from address 0 to owner address', async () => {
      let tx = await truffleAssert.createTransactionResult(ownable, ownable.transactionHash);

      truffleAssert.eventEmitted(tx, 'ContractOwnershipTransferEvent', (e) => {
        return e.oldOwner == 0 && e.newOwner == owner;
      })
    })

    describe('transfer of contract ownership', () => {
      it('only the current contract owner can transfer ownership', async () => {
        await truffleAssert.reverts(
          ownable.transferOwnership(newOwner, {from: notAnOwner}),
          'Caller is not the contract owner.'
        )
      })

      it('successful transfer of ownership should emit a ContractOwnershipTransferEvent', async () => {
        let tx = await ownable.transferOwnership(newOwner, {from: owner});
        truffleAssert.eventEmitted(tx, 'ContractOwnershipTransferEvent', (e) => {
          return e.oldOwner == owner && e.newOwner == newOwner;
        })
      })
    })
  });
})