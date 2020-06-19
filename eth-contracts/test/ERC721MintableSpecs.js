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
    const nonExistentToken = 8888888888;
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
                let tx = await erc721mintable.mint(tokenOwner2, tokenId3);
                truffleAssert.eventEmitted(tx, 'Transfer', (e) => {
                    return  e.from == owner &&
                            e.to == tokenOwner2 &&
                            e.tokenId == tokenId3;
                })
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
                it('should revert if getApproved is for a token that does not exist yet', async () => {
                    await truffleAssert.reverts(
                        erc721mintable.getApproved(nonExistentToken),
                        'Token does not exist'
                    )
                })
                it('should get the approval operator address', async () => {
                    expect(await erc721mintable.getApproved(tokenId1)).to.be.eq(newTokenOwner);
                })
            })

            describe('invoking a transfer', async () => {
                it('should not be possible to complete the token transfer if the caller is not the owner of the token', async () => {
                    await truffleAssert.reverts(
                        erc721mintable.transferFrom(nonOwnerAccount, newTokenOwner, tokenId1),
                        'Caller is not the token owner or an approved operator for the token owner'
                    )
                })
                it('should not be possible to complete the token transfer if the from address is the not the owner of the token', async () => {
                    await truffleAssert.reverts(
                        erc721mintable.transferFrom(tokenOwner1, newTokenOwner, tokenId2),
                        'Caller is not the token owner or an approved operator for the token owner'
                    )
                })
                it('should revert of the to address is a zero non valid address', async () => {
                    await truffleAssert.reverts(
                        erc721mintable.transferFrom(tokenOwner2, zero_address, tokenId2, {from: tokenOwner2}),
                        'Token must be transfered to a valid address'
                    )
                })
                it('when the transfer is successful then the owner counters should be adjusted and an event emitted', async() => {
                    let prevBalanceCurrentOwner = parseInt(await erc721mintable.balanceOf(tokenOwner2));
                    let prevBalanceNewOwner = parseInt(await erc721mintable.balanceOf(newTokenOwner));
                    let tx = await erc721mintable.transferFrom(tokenOwner2, newTokenOwner, tokenId2, {from: tokenOwner2});
                    // ensure that the expected event is emitted
                    truffleAssert.eventEmitted(tx, 'Transfer', (e) => {
                        return  e.from == tokenOwner2 &&
                                e.to == newTokenOwner &&
                                e.tokenId == tokenId2;
                    })
                    // Check the balances have been updated for the previous and new owners.
                    expect(parseInt(await erc721mintable.balanceOf(tokenOwner2))).to.be.eq(prevBalanceCurrentOwner - 1);
                    expect(parseInt(await erc721mintable.balanceOf(newTokenOwner))).to.be.eq(prevBalanceNewOwner + 1);

                    // Check the token owner of the token is updated to the new token owner
                    expect(await erc721mintable.ownerOf(tokenId2)).to.be.eq(newTokenOwner);
                })
            })
        })
    });
})