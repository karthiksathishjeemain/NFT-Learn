const {ethers} = require("hardhat")
async function main(){const provider = new ethers.providers.Web3Provider(windows.ethereum);
await provider.send("eth_accounts", []);
const signer = await provider.getSigner();
console.log(signer);

const account = await windows.ethereum.request({method: 'eth_accounts'});
console.log(account[0]);}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });