# Udacity Blockchain Capstone: Decentralized Property Ownership Product.

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized property ownership product using ERC-721 Tokens and zkSNARKS for zero knowledge proof of ownership.

## ZoKrates

This project uses ZoKrates for implementing zkSNARKS. To run ZoKrates in a Docker Container, run the following command:

```
docker run -v $(pwd)/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.4.6 /bin/bash
```

In the running container bash session run the following to compile the proof code, setup and export the verifier contract.

```
cd code/square
~/zokrates compile -i ./code/zokrates/code/square/
~/zokrates setup
~/zokrates export-verifier
```

Now generate 10 differnt unique proofs ready for the NFT minting process

```
~/zokrates compute-witness -a 1 1
~/zokrates generate-proof
mv proof.json proof1.json
~/zokrates compute-witness -a 2 4
~/zokrates generate-proof
mv proof.json proof2.json
~/zokrates compute-witness -a 3 9
~/zokrates generate-proof
mv proof.json proof3.json
~/zokrates compute-witness -a 4 16
~/zokrates generate-proof
mv proof.json proof4.json
~/zokrates compute-witness -a 5 25
~/zokrates generate-proof
mv proof.json proof5.json
~/zokrates compute-witness -a 6 36
~/zokrates generate-proof
mv proof.json proof6.json
~/zokrates compute-witness -a 7 49
~/zokrates generate-proof
mv proof.json proof7.json
~/zokrates compute-witness -a 8 64
~/zokrates generate-proof
mv proof.json proof8.json
~/zokrates compute-witness -a 9 81
~/zokrates generate-proof
mv proof.json proof9.json
~/zokrates compute-witness -a 10 100
~/zokrates generate-proof
mv proof.json proof10.json
```

### Deployed contrats to Rinkeby

The Verifier and SolnSquareVerifier Contracts are deployed to Rinkeby at the following addresses:

0x32F13a3Cd59dDC8148deE0CD1B8fACbcA5D93794 [Verifier Contract on Rinkeby](https://rinkeby.etherscan.io/address/0x32F13a3Cd59dDC8148deE0CD1B8fACbcA5D93794)
0x70797237915074795Adc107F3751710c6eE58e4f [SolnSquareVerifier Contract on Rinkeby](https://rinkeby.etherscan.io/address/0x70797237915074795Adc107F3751710c6eE58e4f)

Below are the truffle migration logs for the contract deployments:

```
Deploying 'Verifier'
   --------------------
   > transaction hash:    0x35528c5267a4838e9d290aa6a2d8e45085f286843725e6b23956f67a1faf765c
   > Blocks: 0            Seconds: 5
   > contract address:    0x32F13a3Cd59dDC8148deE0CD1B8fACbcA5D93794
   > block number:        6703297
   > block timestamp:     1592704929
   > account:             0x3aD2405264636d19F2869F4580c68391744EBCA1
   > balance:             18.32067154
   > gas used:            1013474 (0xf76e2)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01013474 ETH


Deploying 'SolnSquareVerifier'
------------------------------
   > transaction hash:    0x4b0d8d29ac704365283f0c61cb9474463797a61430c7f1ac3ed3be39c64a85d1
   > Blocks: 2            Seconds: 21
   > contract address:    0x70797237915074795Adc107F3751710c6eE58e4f
   > block number:        6703299
   > block timestamp:     1592704959
   > account:             0x3aD2405264636d19F2869F4580c68391744EBCA1
   > balance:             18.28387767
   > gas used:            3679387 (0x38249b)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03679387 ETH
```

### Contract ABIs

Below are links to the contract ABIs:

[Verifier Contract ABI](eth-contracts/abiVerifier.json).
[SolnSquareVerifier Contract ABI](eth-contracts/abiSolnSquareVerifier.json).

### Mint tokens via MyEtherWallet

Steps to mint tokens via [MEW](www.myetherwallet.com)

1. Open [MEW](www.myetherwallet.com) homepage.
1. Select Access via MetaMask
1. Make sure you are logged into MetaMask and connected to Rinkeby.
1. Click 'Access My Wallet' button
1. Click [Interact with Contract](https://www.myetherwallet.com/interface/interact-with-contract) link
1. Paste in the deployed contract address (e.g. 0x70797237915074795Adc107F3751710c6eE58e4f) and the [Contract API](eth-contracts/abiSolnSquareVerifier.json).
1. Select the mint function (NOT the mintNFT function!) so that you can mint 10 tokens to your own address on the Rinkby network.
1. Paste your address from MetaMask into the __To (address)__ field and the __TokenID (unit256)__ field set to any number. Try 99 first for testing.
1. Confirm the transaction with MetaMask
1. View the [transaction on Ethersacn](https://rinkeby.etherscan.io/tx/0xe89898b71e9aea18e1bcaa1c2e0ab9574d5a732cb4efb244c28c93746cfd3af2).


### Token KH_PROPERTY_TOKEN (KHPT) Etherscan Token Tracker

The deployed and minted KHPT Tokens can be viewed via the [Etherscan Token Tracker](https://rinkeby.etherscan.io/token/0x70797237915074795adc107f3751710c6ee58e4f) here. This shows the total supply of tokens available and who owns them.

For example the [TokenId 99 just minted](https://rinkeby.etherscan.io/token/0x70797237915074795adc107f3751710c6ee58e4f?a=99) above is viewable.

### Create storefront on OpenSea

Once the contract is deployed and tokens are minted, its possible to display them on via an OpenSea storefront. Steps to do this are as follows:

1. Open the [get listed page](https://rinkeby.opensea.io/get-listed/step-two) on OpenSea.
1. Enter the deployed SolnSquareVerifier contract address.
1. This will magically generate a storefront like this one for the [KH PROPERTY TOKEN](https://rinkeby.opensea.io/assets/kh-property-token).

### Auction items in OpenSea

Once your storefront is created you can begin to auction your assets.

1. Ensure that you are logged into MetaMask with the account that you used to mint the tokens earlier.
1. Select each of the tokens one by one and click the Sell button.
1. Set the price and other parameters as you see fit. For this example, I set all tokens to 0.1 ETH.
1. A number of transactions will need to be performed the first time around then after that only a signed confirmation is required.

### Purchase items in OpenSea

Once tokens are available for auction on OpenSea they can be purchased!

1. Switch accounts in MetaMask to a different account to the current owner of all the tokens.
1. Select a property and now you should be asked if you want to buy it.
1. Click buy, sign the transaction, wait for confirmation and now you are the new owner.
1. You can verify this transfer of ownership via the [Etherscan Token Tracker](https://rinkeby.etherscan.io/token/0x70797237915074795adc107f3751710c6ee58e4f)

### Trading activity on OpenSea

The trading activity for the KHPT tokens can be viewed in the [OpenSea activity log](https://rinkeby.opensea.io/activity/kh-property-token).

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
