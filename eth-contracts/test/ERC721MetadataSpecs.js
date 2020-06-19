var ERC721Metadata = artifacts.require('ERC721Metadata');

contract('ERC721Metadata contract', accounts => {
    const owner = accounts[0];
    const name = 'KH_PROPERTY_TOKEN';
    const symbol = 'KHPT';
    const baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';
    let erc721metadata;

    describe('match erc721 spec', function () {
        before(async () => {
          erc721metadata = await ERC721Metadata.new(name, symbol, baseTokenURI, {from: owner});
        })

        it('should be able to return the token name', async () => {
          expect(await erc721metadata.name()).to.be.eq(name);
        })
        it('should be able to return the token symbol', async () => {
          expect(await erc721metadata.symbol()).to.be.eq(symbol);
        })
        it('should be able to return the token baseURI',async  () => {
          expect(await erc721metadata.baseTokenURI()).to.be.eq(baseTokenURI);
        })
    })
})