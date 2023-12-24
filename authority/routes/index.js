const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
// const sha256 = require('js-sha256')
const dotenv = require("dotenv").config();
const User = require("../models/user");
const Web3 = require("web3");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/3956a14355e64e05960416672e54b71f"
);

const ageToBeVerified = process.env.AGE;

// -------------------- Routes ----------------------------

router.post("/signUp", async (req, res) => {
  const { email, password, username, age } = req.body;
  try {
    const userData = await User.create({
      email: email,
      username: username,
      password: password,
      age: age,
    });
    console.log(userData);
    res.status(200).send({ user: userData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error);
  }
});

router.post("/genSecret", async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    console.log("userData", userData);
    const usermash = userData.age + userData.email + userData.username;
    console.log("userMash", usermash);
    const secret = web3.utils.keccak256(usermash);
    console.log("secret =======================> ", secret);
    const encryptedSecret = await encryptSecret(secret, userData.age);
    console.log("EncryptedSecret++++++++++++++>>> ", encryptedSecret);
    const proof = await generateProof(secret, userData.age);
    console.log("Proof =>>>>>>>>>>>>> ", proof);

    if (proof) {
      res.status(200).send({
        secret: secret,
        encryptedSecret: encryptedSecret,
        proof: proof,
      });
    } else {
      res.status(500).send({
        err: "You are UnderAge",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ err: error });
  }
});

// -------------------- Internal Functions -------------------------------------

async function encryptSecret(secret, age) {
  let tempHash = web3.utils.keccak256(secret);

  for (let i = 1; i <= age + 1; i++) {
    tempHash = web3.utils.keccak256(tempHash);
    console.log("Temp------>", tempHash);
  }
  return tempHash;
}

async function generateProof(secret, age) {
  let limit = 1 + age - ageToBeVerified;
  let proof = web3.utils.keccak256(secret);
  console.log("limit", limit);

  if (limit <= 0) {
    return;
  } else {
    for (let i = 1; i < limit; i++) {
      proof = web3.utils.keccak256(proof);
      console.log("temporary proof ------------>", proof);
    }
  }
  return proof;
}

// ------------- Export -------------

module.exports = router;
