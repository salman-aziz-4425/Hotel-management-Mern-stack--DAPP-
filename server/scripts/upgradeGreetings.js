const {ethers,upgrades}=require("hardhat")

async function main() {
    const Lock = await ethers.getContractFactory("Greetings2")
    console.log("Greetings is upgrading.....")
   await upgrades.upgradeProxy(
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
     Lock
   )
}
main()