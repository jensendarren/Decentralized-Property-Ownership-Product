# Udacity Blockchain Capstone: Decentralized Property Ownership Product.

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized property ownership product using ERC-721 Tokens and zkSNARKS for zero knowledge proof of ownership.

## ZoKrates

This project uses ZoKrates for implementing zkSNARKS. To run ZoKrates in a Docker Container, run the following command:

```
docker run -v $(pwd)/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.4.6 /bin/bash
```

In the running container bash session run the following to confirm ZoKrates is configured correctly:

```
~/zokrates compile -i ./code/zokrates/code/square/
~/zokrates setup
~/zokrates compute-witness -a 2 4
~/zokrates generate-proof
~/zokrates export-verifier
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
