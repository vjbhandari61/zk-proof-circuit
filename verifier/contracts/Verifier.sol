pragma solidity ^0.8.0;

contract Verifier {

    event Verification(bool success);

    function verify(bytes32 proof, bytes32 encryptedSecret) public returns (bool) {

        bytes32 verificationHash  = keccak256(abi.encodePacked(proof));
       
        for(uint i = 1; i<= 18; i++) {
            verificationHash = keccak256(abi.encodePacked(verificationHash));
        }

        if(verificationHash == encryptedSecret) {
            emit Verification(true);
            return true;
        } else {
            emit Verification(false);
            return false;
        }
    }    
}