import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule("0x94aaCC714A2d86f622d64238C68d840eE9fD0bC6");

(async () => {
  try {
    await bundleDrop.createBatch([{
        name: "Game stuff",
        description: "This NFT will give you access to Jay's GameDAO",
        image: readFileSync("scripts/assets/gaming.jpg"),
    }]);
    console.log("Successfully created NFT in the drop.");
  } catch (err) {
    console.error("failed to create NFT in the drop: ", err);
  }
})();