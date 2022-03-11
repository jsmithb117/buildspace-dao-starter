import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const bundleDropModule = sdk.getBundleDropModule("0x94aaCC714A2d86f622d64238C68d840eE9fD0bC6");

const tokenModule = sdk.getTokenModule("0x0bCBd3640625c3d07Cad73fcbcC674f5b76dc327");

(async () => {
  try {

    const walletAddresses = await await bundleDropModule.getAllClaimerAddresses("0");
    if (walletAddresses.length === 0) {
    console.log("No NFTs have been claimed yet, maybe get some frineds to claim your free NFTs!");
    process.exit(0);
  }

  const airdropTargets = walletAddresses.map((address) => {
    const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
    console.log(`${address} will receive ${randomAmount} $JGDT tokens.`);
    const airdropTarget = {
      address,
      amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
    };

    return airdropTarget;
  });

  console.log("Starting airdrop");
  await tokenModule.transferBatch(airdropTargets);
  console.log("Airdrop complete");
  } catch (err) {
    console.error("failed to airdrop tokens: ", err);
  }
})();