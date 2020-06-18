var ERC721Mintable = artifacts.require('ERC721MintableTestContract');
const truffleAssert = require('truffle-assertions');

contract('ERC721Mintable contract', accounts => {

    const zero_address = "0x0000000000000000000000000000000000000000";
    const owner = accounts[0];
    const tokenOwner1 = accounts[1];
    const tokenOwner2 = accounts[2];
    const tokenId1 = 8;
    const tokenId2 = 88;
    const tokenId3 = 888;
    let erc721mintable;

    describe('match erc721 spec', function () {
        before(async function () {
            erc721mintable = await ERC721Mintable.new({from: owner});
        })

        describe('minting tokens', async () => {
            it('should not be possible to mint tokens to a zero address', async () => {
                await truffleAssert.reverts(
                    erc721mintable.mint(zero_address, tokenId1),
                    'Address is not valid'
                )
            })

            it('should be possible to mint tokens', async () => {
                await erc721mintable.mint(tokenOwner1, tokenId1);
                await erc721mintable.mint(tokenOwner2, tokenId2);
                await erc721mintable.mint(tokenOwner2, tokenId3);
            })

            it('should get token balance for each token owner', async function () {
                expect((await erc721mintable.balanceOf(tokenOwner1)).toString(10)).to.be.eq('1')
                expect((await erc721mintable.balanceOf(tokenOwner2)).toString(10)).to.be.eq('2')
            })
        })


        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        xit('should return token uri', async function () {

        })

        xit('should transfer token from one owner to another', async function () {

        })
    });
})