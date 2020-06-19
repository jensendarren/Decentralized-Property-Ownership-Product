pragma solidity ^0.5.5;
import './ERC721Mintable.sol';

contract SolnSquareVerifier is CustomERC721Token {
    Verifier zksnark;
    constructor(address verifierContractAddress, string memory name, string memory symbol) public
    CustomERC721Token(name, symbol) {
        zksnark = Verifier(verifierContractAddress);
    }
}

contract Verifier {
    function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bool);
}

// TODO define a solutions struct that can hold an index & an address


// TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added



// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
