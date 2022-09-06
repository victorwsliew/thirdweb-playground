import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateDelayedRevealNft(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const goerliSDK = ThirdwebSDK.fromPrivateKey(
    process.env.NEXT_PUBLIC_GOERLI_WALLET_PRIVATE_KEY as string,
    "goerli"
  );
  
  const contract = goerliSDK.getNFTDrop(
    process.env.NEXT_PUBLIC_DELAYED_REVEAL_NFT_CONTRACT_ADDRESS as string
  );
  // the real NFTs, these will be encrypted until you reveal them
  const realNFTs = [
    {
      name: "Common NFT #1",
      description: "Common NFT, one of many.",
      animation_url: fs.readFileSync("./public/1.mp3"), // use animation_url for audio / video url
      image: fs.readFileSync("./public/1.png"),
    },
  ];
  // A placeholder NFT that people will get immediately in their wallet, and will be converted to the real NFT at reveal time
  const placeholderNFT = {
    name: "Hidden NFT",
    description: "Will be revealed next week!",
    animation_url: fs.readFileSync("./public/1_placeholder.mp3"),
    image: fs.readFileSync("./public/test.jpg"),
  };

  await contract.revealer.createDelayedRevealBatch(
    placeholderNFT,
    realNFTs,
    "password"
  );

  res.status(200).json({ success: true });
}
