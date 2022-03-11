import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x0F68C3F4836bB13fbaB4409DD919D5A30670D637");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "Jay's GameDAO",
      description: "A DAO for Jay's game",
      image: readFileSync("scripts/assets/gaming.jpg"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log("Successfully deployed bundle drop module, address: ", bundleDropModule.address);
    console.log('Bundle drop metadata: ', await bundleDropModule.getMetadata());
  } catch (err) {
    console.error("failed to deploy bundle drop module: ", err);
    process.exit(1);
  }
})();