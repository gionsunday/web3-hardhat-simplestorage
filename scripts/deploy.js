//import 

const { errors } = require("ethers");
const { ConstructorFragment } = require("ethers/lib/utils");
const {ethers, run, network} = require('hardhat')

//async

async function main() {
   const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
   console.log("Deploying contract...")
   const simpleStorage = await SimpleStorageFactory.deploy()
   await simpleStorage.deployed()

   console.log(`Deployed to:  ${simpleStorage.address}`)
    
   //check network
   console.log(network.config)
   if(network.config.chainId ===  11155111 && process.env.ETHERSCAN_API_KEY){
   console.log("Waiting for block txes...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
   }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is :${currentValue}`)

    ///update number now
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value : ${updatedValue}`)

}


//verify contract
async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address:contractAddress,
      constructorArguments: args, 
    })

  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log("Already Verified")
    }
    else{
      console.log(error)
    }
  }
 
   
}

//main
main()
.then(() =>process.exit(0))
.catch((error) =>{
  console.error(error)
  process.exit(1)
})   
