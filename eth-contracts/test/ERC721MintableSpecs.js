var ERC721Mintable = artifacts.require('ERC721MintableTestContract');
const truffleAssert = require('truffle-assertions');

contract('ERC721Mintable contract', accounts => {

    const zero_address = "0x0000000000000000000000000000000000000000";
    const owner = accounts[0];
    const tokenOwner1 = accounts[1];
    const tokenOwner2 = accounts[2];
    const newTokenOwner = accounts[3];
    const tokenApprovalOperator = accounts[8];
    const nonOwnerAccount = accounts[9];
    const tokenId1 = 8;
    const tokenId2 = 88;
    const tokenId3 = 888;
    let erc721mintable;

    describe('match erc721 spec', function () {
        before(async () => {
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
        })

        describe('token ownership', async () => {
            it('should get token balance for each token owner', async () => {
                expect((await erc721mintable.balanceOf(tokenOwner1)).toString(10)).to.be.eq('1')
                expect((await erc721mintable.balanceOf(tokenOwner2)).toString(10)).to.be.eq('2')
            })

            it('should be possible to get the owner of a token', async () => {
                expect(await erc721mintable.ownerOf(tokenId1)).to.be.eq(tokenOwner1);
                expect(await erc721mintable.ownerOf(tokenId2)).to.be.eq(tokenOwner2);
                expect(await erc721mintable.ownerOf(tokenId3)).to.be.eq(tokenOwner2);
            })
        })

        describe('setting approval for all', () => {
            it('should revert if the operator address is the same as the caller', async () => {
                await truffleAssert.reverts(
                    erc721mintable.setApprovalForAll(owner, true),
                    'Operator address must be different from the caller'
                )
            })
            it('should emit a ApprovalForAll event', async () => {
                let tx = await erc721mintable.setApprovalForAll(tokenApprovalOperator, true, {from: tokenOwner1})
                truffleAssert.eventEmitted(tx, 'ApprovalForAll', (e) => {
                    return  e.owner == tokenOwner1 &&
                            e.operator == tokenApprovalOperator &&
                            e.approved == true;
                })
            })
            it('isApprovedForAll function should return the approval token operator approval state', async () => {
                expect(await erc721mintable.isApprovedForAll(tokenOwner1, tokenApprovalOperator)).to.be.true
            })
        })

        describe('token transfer', () => {
            describe('approve transfer', () => {
                it('should revert if the token is already owned by the to account', async () => {
                    await truffleAssert.reverts(
                        erc721mintable.approve(tokenOwner1, tokenId1),
                        'The token is already owned by the account'
                    )
                })
                it('should revert if the caller is not the token owner or the approved operator', async () => {
                    await truffleAssert.reverts(
                        erc721mintable.approve(tokenOwner2, tokenId1, {from: nonOwnerAccount}),
                        'Caller is not the token owner or an approved operator for the token owner'
                    )
                })
                it('should emit an Approval event when sucessfully adding an approved address', async () => {
                    let tx = await erc721mintable.approve(newTokenOwner, tokenId1, {from: tokenApprovalOperator});
                    truffleAssert.eventEmitted(tx, 'Approval', (e) => {
                        return  e.owner == tokenOwner1 &&
                                e.approved == newTokenOwner &&
                                e.tokenId == tokenId1;
                    })
                })
            })
        })


        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        xit('should return token uri', async function () {

        })

        xit('should transfer token from one owner to another', async function () {

        })
    });
})