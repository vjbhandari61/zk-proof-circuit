const CONTRACT_ADDRESS = "0x3fACa89bC4984036F08c1F17a6bC111FbF29B127";
const ABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "Verification",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "proof",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "encryptedSecret",
				"type": "bytes32"
			}
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
module.exports = { CONTRACT_ADDRESS, ABI };