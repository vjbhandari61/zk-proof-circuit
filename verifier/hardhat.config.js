require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/3956a14355e64e05960416672e54b71f`,
      accounts: ["1fc46178e5c89388b4656b032625ee0bb8b9b30f72abb75e6c05cc2e84c09784"]
    }
  }
};
