pragma solidity ^0.5.5;
import './ERC721Mintable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract SolnSquareVerifier is CustomERC721Token {
    Verifier zksnark;

    using SafeMath for uint256;

    uint256 private solutionsCount = 1;

    event SolutionSubmitted(bytes32 key, address prover);
    constructor(address verifierContractAddress, string memory name, string memory symbol) public
    CustomERC721Token(name, symbol) {
        zksnark = Verifier(verifierContractAddress);
    }

    struct Solution {
        uint256 index;
        address prover;
        bool valid;
    }

    mapping(bytes32 => Solution) public solutions;

    function submitSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public returns(bytes32) {
        require(zksnark.verifyTx(a, b, c, input), "Solution is not valid.");
        bytes32 key = getSolutionKey(input);
        require(
            solutions[key].prover == address(0),
            "Solution already submitted by prover."
        );

        solutions[key] = Solution({
            index: solutionsCount,
            prover: msg.sender,
            valid: true
        });

        solutionsCount.add(1);

        emit SolutionSubmitted(key, msg.sender);

        return key;
    }

    function getSolutionKey(uint256[2] memory input) internal returns(bytes32) {
        return keccak256(abi.encodePacked(input[0], input[1]));
    }
}

contract Verifier {
    function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bool);
}



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
