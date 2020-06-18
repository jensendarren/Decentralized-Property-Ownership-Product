const ERC165TestContract = artifacts.require('ERC165TestContract');
const truffleAssert = require('truffle-assertions');

contract('ERC165 Contract', accounts => {

  const owner = accounts[0];
  const INTERFACE_ID_ERC165 = '0x01ffc9a7'
  const INTERFACE_ID_ERC165_BYTES_4 = web3.utils.hexToBytes(INTERFACE_ID_ERC165);

  let ownable;

  describe('ERC165 properties', function () {
    before(async () => {
      erc165 = await ERC165TestContract.new({from: owner});
    })

    it('should have the ERC165 interface already registered', async () =>{
      expect(await erc165.supportsInterface(INTERFACE_ID_ERC165_BYTES_4)).to.be.true
    })

    it('should not be possible to register an interface ID 0xffffffff', async () => {
      let invalidInterfaceId = web3.utils.hexToBytes('0xffffffff');
      await truffleAssert.reverts(
        erc165.registerInterface(invalidInterfaceId),
        'Interface ID not valid'
      )
    })

    it('should register the interface ID from the first 4 bytes only', async () => {
      let interfaceId5Bytes = web3.utils.hexToBytes('0x02ffd5e166'); // 5 bytes
      let interfaceId4Bytes = web3.utils.hexToBytes('0x02ffd5e1'); // 4 bytes
      await erc165.registerInterface(interfaceId5Bytes) // reguster using 5 bytes works
      expect(await erc165.supportsInterface(interfaceId4Bytes)).to.be.true; // only the 4 bytes are used however.
    })

    it('should be possible to register a new valid interface', async () => {
      let newInterfaceId = web3.utils.hexToBytes('0x02ffd5e1');

      await erc165.registerInterface(newInterfaceId)
      expect(await erc165.supportsInterface(newInterfaceId)).to.be.true;
    })
  })
})
