const { expect } = require("chai");

describe("NFT", function () {
  let nft, deployer, addr1, addr2;
  const NAME = "Test Name";
  const SYMBOL = "TS";
  const URIS = ["one", "two", "three"];

  beforeEach(async function () {
    //get contract factories
    const NFT = await ethers.getContractFactory("NFT");

    //get signers
    [deployer, addr1, addr2] = await ethers.getSigners();

    //deploy signers
    nft = await NFT.deploy(URIS, NAME, SYMBOL);
  });

  describe("Deployment", function () {
    it("Should set the right Name", async function () {
      expect(await nft.name()).to.equal(NAME);
    });

    it("Should set the right Symbol", async function () {
      expect(await nft.symbol()).to.equal(SYMBOL);
    });

    it("Should mint initially passed nft's", async function () {
      expect(await nft.tokenCount()).to.equal(URIS.length);
    });

    it("Should mint nft's with right URIs", async function () {
      for (let i = 0; i < URIS.length; i++) {
        expect(await nft.tokenURI(i)).to.equal(URIS[i]);
      }
    });
  });
});
