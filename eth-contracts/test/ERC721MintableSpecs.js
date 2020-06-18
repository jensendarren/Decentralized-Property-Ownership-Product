var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    // const account_two = accounts[1];

    xdescribe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () {

        })

        it('should get token balance', async function () {

        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {

        })

        it('should transfer token from one owner to another', async function () {

        })
    });
})