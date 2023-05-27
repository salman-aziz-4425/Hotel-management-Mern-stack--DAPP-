const {ethers,upgrades}=require("hardhat")
async function main() {
  const Lock = await ethers.getContractFactory("hotelManagement");
  const lock = await Lock.deploy("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
  await lock.deployed();
  console.log("Deployed to:",lock.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
