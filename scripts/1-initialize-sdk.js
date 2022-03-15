import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.error('Private key not found.');
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
  console.error('Alchemy API URL not found.');
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.error('Wallet address not found.');
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(process.env.PRIVATE_KEY, ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)),
);

(async () => {
  try {
    console.log('Initializing SDK...');
    const apps = await sdk.getApps();
    console.log("App address: ", apps[0].address);
  } catch (err) {
    console.error("failed to get apps from the SDK: ", err);
    process.exit(1);
  }
})();

export default sdk;
