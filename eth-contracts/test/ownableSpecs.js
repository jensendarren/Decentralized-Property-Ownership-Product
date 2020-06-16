var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];

  describe('have ownership properties', function () {
    beforeEach(async function () {
        this.contract = await ERC721MintableComplete.new({from: account_one});
    })

    it.only('should return contract owner', async function () {

    })

    it('should fail when minting when address is not contract owner', async function () {

    })

  });
})