pragma solidity ^0.5.5;
import './ERC721Mintable.sol';

contract SolnSquareVerifier is CustomERC721Token {
    Verifier zksnark;

    event SolutionSubmitted(address prover);
    constructor(address verifierContractAddress, string memory name, string memory symbol) public
    CustomERC721Token(name, symbol) {
        zksnark = Verifier(verifierContractAddress);
    }

    struct Solution {
        uint8 index;
        address prover;
        bool valid;
    }

    mapping(bytes32 => Solution) solutions;

    function submitSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public returns(bytes32) {
        bytes32 key = getSolutionKey(input);
        return key;
    }

    function getSolutionKey(uint256[2] memory input) internal returns(bytes32) {
        return keccak256(abi.encodePacked(input[0], input[1]));
    }
}

contract Verifier {
    function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bool);
}




// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
