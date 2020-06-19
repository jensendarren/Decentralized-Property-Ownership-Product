var CustomERC721Token = artifacts.require('CustomERC721Token');
const truffleAssert = require('truffle-assertions');

contract('CustomERC721Token contract', accounts => {
    const owner = accounts[0];
    const newTokenOwner = accounts[3];
    const nonOwnerAccount = accounts[9];
    const tokenId1 = 8;
    const tokenId2 = 88;
    const name = 'KH_PROPERTY_TOKEN';
    const symbol = 'KHPT';
    const baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';
    let customERC721token;

    describe('fetching token meta data', function () {
        before(async () => {
          customERC721token = await CustomERC721Token.new(name, symbol, {from: owner});
        })
        it('should be able to return the token name', async () => {
          expect(await customERC721token.name()).to.be.eq(name);
        })
        it('should be able to return the token symbol', async () => {
          expect(await customERC721token.symbol()).to.be.eq(symbol);
        })
        it('should be able to return the token baseURI',async  () => {
          expect(await customERC721token.baseTokenURI()).to.be.eq(baseTokenURI);
        })
    })
    describe('minting tokens', function () {
      before(async () => {
        customERC721token = await CustomERC721Token.new(name, symbol, {from: owner});
      })
      it('should only be called by the contract owner', async () => {
        await truffleAssert.reverts(
          customERC721token.mint(newTokenOwner, tokenId1, {from: nonOwnerAccount}),
          'Caller is not the contract owner.'
        )
      })
      it('should set the tokenURI when sucessfully minted', async () => {
        await customERC721token.mint(newTokenOwner, tokenId1);
        let token1URI = baseTokenURI + tokenId1;
        expect(await customERC721token.tokenURI(tokenId1)).to.be.eq(token1URI);
      })
      it('should be recored as minted for the new owner', async () => {
        await customERC721token.mint(newTokenOwner, tokenId2);
        expect(await customERC721token.ownerOf(tokenId1)).to.be.eq(newTokenOwner);
      })
  })
})
