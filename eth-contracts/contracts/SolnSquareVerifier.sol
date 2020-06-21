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
        bool minted;
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
            minted: false
        });

        solutionsCount = solutionsCount.add(1);

        emit SolutionSubmitted(key, msg.sender);

        return key;
    }

    function getSolutionKey(uint256[2] memory input) internal returns(bytes32) {
        return keccak256(abi.encodePacked(input[0], input[1]));
    }

    function mintNFT(uint256[2] memory input, address to) public returns (bool) {
        bytes32 key = getSolutionKey(input);
        require(solutions[key].prover != address(0x0), "Solution does not exist.");
        require(solutions[key].minted == false, "Token is already minted.");
        require(solutions[key].prover == to, "Only solution prover can mint this token");

        super.mint(to, solutions[key].index);
        solutions[key].minted = true;
        return true;
    }
}

contract Verifier {
    function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bool);
}




