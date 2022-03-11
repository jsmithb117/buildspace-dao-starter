import React, { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule(
  "0x94aaCC714A2d86f622d64238C68d840eE9fD0bC6"
);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("Address: ", address);

  const signer = provider?.getSigner();
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }
      const balance = await bundleDropModule.balanceOf(address, "0");

      try {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("User has a membership NFT");
        } else {
          setHasClaimedNFT(false);
          console.log("User does not have a membership NFT");
        }
      } catch (err) {
        setHasClaimedNFT(false);
        console.error("Failed to get NFT balance: ", err);
      }
    })();
  }, [address]);

  if (!address) {
    return (
      <div className="landing">
        <h1>Jay's GameDAO</h1>
        <button
          onClick={() => connectWallet("injected")}
          className="btn-connect"
        >
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>DAO Member Page</h1>
        <p>Congrats on being a member!</p>
      </div>
    )
  }

  const mintNft = async () => {
    setIsClaiming(true);
    try {
      await bundleDropModule.claim("0", 1);
      setHasClaimedNFT(true);
      console.log(
        `Successfully minted NFT.  Check it out at https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
      );
    } catch (err) {
      console.error("Failed to claim NFT: ", err);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="mint-nft">
      <h1>Mint your free Jay's GameDAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your NFT"}
        </button>
    </div>
  );
};

export default App;
