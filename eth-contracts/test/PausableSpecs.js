const Pausable = artifacts.require('Pausable');
const truffleAssert = require('truffle-assertions');

contract('Pausable Contract', accounts => {

  const owner = accounts[0];
  const notAnOwner = accounts[2];

  let pausable;
  let initialPausedState;
  let newPausedState;

  before(async () => {
    pausable = await Pausable.new({from: owner})
    initialPausedState = false;
    newPausedState = !initialPausedState;
  })

  describe('setting paused state', () => {
    it('should deault to an unpaused state (false)', async () => {
      expect(await pausable.isPaused()).to.be.false;
    })
    it('should be not be possible to set the paused state to the same state', async () => {
      await truffleAssert.reverts(
        pausable.setPaused(initialPausedState),
        'The new paused state should be different from the current paused state.'
      )
    })
    it('should only be the contract owner who can set the paused state', async () => {
      await truffleAssert.reverts(
        pausable.setPaused(newPausedState, {from: notAnOwner}),
        'Caller is not the contract owner.'
      )
    })
    it('should be possible for the contract owner to change the paused state', async () => {
      await pausable.setPaused(newPausedState, {from: owner});
      expect(await pausable.isPaused()).to.be.true;
    })
  })

  describe('Paused & Unpaused events', () => {
    before(async () => {
      pausable = await Pausable.new({from: owner})
    })

    it('calling the constructor should emit a UnpausedEvent', async () => {
      let tx = await truffleAssert.createTransactionResult(pausable, pausable.transactionHash);

      truffleAssert.eventEmitted(tx, 'UnpausedEvent', (e) => {
        return e.caller == owner;
      })
    })

    it('when the contract is set to paused a Paused event is fired with the address of the caller', async () => {
      let tx = await pausable.setPaused(true, {from: owner})
      truffleAssert.eventEmitted(tx, 'PausedEvent', (e) => {
        return e.caller == owner;
      })
    })

    it('when the contract is set to unpaused a Unpaused event is fired with the address of the caller', async () => {
      let tx = await pausable.setPaused(false, {from: owner})
      truffleAssert.eventEmitted(tx, 'UnpausedEvent', (e) => {
        return e.caller == owner;
      })
    })
  })
})