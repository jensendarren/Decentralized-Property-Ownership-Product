# Decentralized Property Ownership Product.

[![Build Status](https://travis-ci.org/jensendarren/Decentralized-Property-Ownership-Product.svg?branch=master)](https://travis-ci.org/jensendarren/Decentralized-Property-Ownership-Product)

This application is the __final project__ (capstone) for the [Blockchain Nanodegree](https://www.udacity.com/course/blockchain-developer-nanodegree--nd1309) with __Udacity__. Enjoy and feel free to comment! This project builds upon the knowledge gained in the [Blockchain Nanodegree](https://www.udacity.com/course/blockchain-developer-nanodegree--nd1309) course in order to build a __decentralized property ownership product using ERC-721 Tokens and zkSNARKS for zero knowledge proof of ownership__.

## Truffle version and OpenZeppelin version used in the project.

This project was built using the following framework versions:

* Truffle v5.1.14-nodeLTS.0 (core: 5.1.13)
* Ganache CLI v6.9.1 (ganache-core: 2.10.2)
* OpenZeppelin (openzeppelin-solidity) v2.5.1
* Solidity v0.5.16 (solc-js)
* Node v12.18.1
* Web3.js v1.2.1
* Truffle Assertions v0.9.2

## Running tests

To run the test suite for the smart contracts:

1. Clone this repo
1. Change into the project directory `cd Udacity-Blockchain-Capstone/`
1. Ensure you already have __npm v6.14.5__ and __node v12.18.1__ installed.
1. Install dependenceis `npm i`
1. Install Ganache CLI `npm i -g ganache-cli`
1. Install Truffle `npm i -g truffle@nodeLTS`
1. Check truffle version by running `truffle version`.
1. Change into the __eth-contracts__ directory `cd eth-contracts`
1. Create an empty __.secret__ file `touch .secret`
1. Compile the contracts `truffle compile`
1. In one terminal window, start ganache-cli `ganache-cli`
1. In a separate terminal window, run the smart contract specs via `truffle test`

After following the above process, you should see all the tests passing as they are on [Travis CI](https://travis-ci.org/jensendarren/Udacity-Blockchain-Capstone).

## ZoKrates

This project uses ZoKrates for implementing zkSNARKS. To run ZoKrates in a Docker Container, run the following command:

```
docker run -v $(pwd)/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.4.6 /bin/bash
```

In the running container terminal execute the following commands to compile the proof code, setup and export the verifier contract.

```
cd code/square
~/zokrates compile -i ./code/zokrates/code/square/
~/zokrates setup
~/zokrates export-verifier
```

Now generate 10 different unique proofs ready for the NFT minting process:

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

Use an [Infura project](https://infura.io) to deploy to Rinkeby. Take a look in [truffle-config](./eth-contracts/truffle-config.js) file to see the Rinkby network configuration.

To migrate contracts to the Rinkeby network run:

```
truffle migrate --network rinkeby
```

The __Verifier__ and __SolnSquareVerifier__ Contracts are already deployed to Rinkeby at the following addresses:

* [Verifier Contract on Rinkeby](https://rinkeby.etherscan.io/address/0x32F13a3Cd59dDC8148deE0CD1B8fACbcA5D93794) __0x32F13a3Cd59dDC8148deE0CD1B8fACbcA5D93794__
* [SolnSquareVerifier Contract on Rinkeby](https://rinkeby.etherscan.io/address/0x70797237915074795Adc107F3751710c6eE58e4f) __0x70797237915074795Adc107F3751710c6eE58e4f__

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

* [Verifier Contract ABI](eth-contracts/abiVerifier.json).
* [SolnSquareVerifier Contract ABI](eth-contracts/abiSolnSquareVerifier.json).

### Mint tokens via MyEtherWallet

Steps to mint tokens via [MEW](https://www.myetherwallet.com/)

1. Open [MEW](https://www.myetherwallet.com/) homepage.
1. Select Access via MetaMask
1. Make sure you are logged into MetaMask and connected to the Rinkeby network.
1. Click _Access My Wallet_ button
1. Click [Interact with Contract](https://www.myetherwallet.com/interface/interact-with-contract) link
1. Paste in the deployed contract address (e.g. __0x70797237915074795Adc107F3751710c6eE58e4f__) and the [SolnSquareVerifier Contract ABI](eth-contracts/abiSolnSquareVerifier.json).
1. Select the __mint__ function (NOT the mintNFT function!) so that you can mint 10 tokens to your own address on the Rinkby network without having to submit a proof. This is OK for the testing of this contract for this case.
1. Paste your address from MetaMask into the __To (address)__ field and the __TokenID (unit256)__ field set to any number. Try 99 first for testing.
1. Confirm the transaction with MetaMask
1. View the [transaction on Ethersacn](https://rinkeby.etherscan.io/tx/0xe89898b71e9aea18e1bcaa1c2e0ab9574d5a732cb4efb244c28c93746cfd3af2).
1. Continue to mint TokenIds 1 to 10.

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
1. Select each of the tokens one by one and click the __Sell__ button.
1. Set the price and other parameters as you see fit. For this example, I set all token prices to __0.1 ETH__.
1. A number of transactions will need to be performed the first time around then after that only a signed confirmation is required.

### Purchase items in OpenSea

Once tokens are available for auction on OpenSea they can be purchased!

1. Switch accounts in MetaMask to a _different account_ to the current owner of all the tokens. Make sure that this account has some Ether!
1. Select a property / token and now you should be asked if you want to buy it!
1. Click __Buy__ button, sign the transaction, wait for confirmation and now you are the new owner of this property / token.
1. You can verify this transfer of ownership via the [Etherscan Token Tracker](https://rinkeby.etherscan.io/token/0x70797237915074795adc107f3751710c6ee58e4f)

### Trading activity on OpenSea

The trading activity for the __KHPT tokens__ can be viewed in the [OpenSea Activity Log](https://rinkeby.opensea.io/activity/kh-property-token) for the _KH_PROPERTY_TOKEN Stream_.

The 5 purchased / sold / transfered tokens are:

* [Cozy family home](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/1)
* [Luxury Home](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/2)
* [Manufacturing Warehouse](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/3)
* [Small Condo](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/4)
* [Floating House](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/5)

The 5 unpurchased (still owned by the original contract owner) tokens are:

* [KH_PROPERTY_TOKEN #6](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/6)
* [KH_PROPERTY_TOKEN #7](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/7)
* [KH_PROPERTY_TOKEN #8](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/8)
* [KH_PROPERTY_TOKEN #9](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/9)
* [KH_PROPERTY_TOKEN #10](https://rinkeby.opensea.io/assets/0x70797237915074795adc107f3751710c6ee58e4f/10)


### Issue Reporting

If you experience with bugs or need further improvement, please create a new issue under [Issues](https://github.com/jensendarren/Udacity-Blockchain-Capstone/issuess).

### Contributing to the Decentralized Property Ownership Product!

Pull requests are very welcome. Before submitting a pull request, please make sure that your changes are well tested. Pull requests without tests will not be accepted. In this project we currently use Truffle Tests (Mocha JS / Chai JS).

### Authors

This **Decentralized Property Ownership Product** application was developed as part of the Blockchain Nanodegree with [Udacity](http://www.udacity.com) and [Darren Jensen](https://www.linkedin.com/in/jensendarren1/).

### License

This **Decentralized Property Ownership Product** application is released under [AGPL](http://www.gnu.org/licenses/agpl-3.0-standalone.html)

### Disclaimer

This application is part of a _project assignment_ and is most definitely __not__ suitable for Production use! :)

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
