const {ethers,upgrades}=require("hardhat")
async function main() {
  const Lock = await ethers.getContractFactory("hotelManagement");
  const lock = await Lock.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
  await lock.deployed();
  console.log("Deployed to:",lock.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x5FbDB2315678afecb367f032d93F642f64180aa3