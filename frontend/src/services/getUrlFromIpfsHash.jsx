export const getUrlFromIpfsHash = async (ipfsHash) => {
  try {
    const fileUrl = `${import.meta.env.VITE_IPFS_URL}${
      ipfsHash
    }`;
    return fileUrl
  } catch (error) {
    throw "Error getting file from IPFS";
  }
};
