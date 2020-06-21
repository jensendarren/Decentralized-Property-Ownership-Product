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

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
