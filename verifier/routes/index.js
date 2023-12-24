const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const dotenv = require('dotenv').config()
const Web3 = require('web3');

// const callVerify = require('../scripts/verification'); 

const web3 = new Web3('https://rinkeby.infura.io/v3/3956a14355e64e05960416672e54b71f')

// ---------------------- Routes --------------------------------

router.post('/verifyMe', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:4000/genSecret', {
      email: req.body.email
    });
    console.log('response => ', response.data);
    // const verificationKey = await callVerify(response.data.proof, response.data.encryptedSecret);

    res.status(200).send({ encryptedSecret: response.data.encryptedSecret, proof: response.data.proof});
  } catch (error) {
    console.log('Error: ', error)
    res.status(500).send({ verfication: "Failed"});
  }
})

// -------------------------- Internal Methods -----------------------

// async function genVerifySecret (proof) {
//   let tempHash = web3.utils.keccak256(proof)

//   for (let i = 1; i <= 18; i++) {
//     tempHash = sha256(tempHash)
//   }

//   console.log('Verified', tempHash)
//   return tempHash
// }

module.exports = router
