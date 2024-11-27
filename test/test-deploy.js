const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function (){
   let simpleStorageFactory
   let simpleStorage
  beforeEach(async function() {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it(" Should start with a favorite number of 0", async function () {
    const cureentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    assert.equal(cureentValue.toString(), expectedValue)
  })
  it("Should update when store function is called", async function(){
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const cureentValue = await simpleStorage.retrieve()
    assert.equal(cureentValue.toString(), expectedValue)
  } )
})