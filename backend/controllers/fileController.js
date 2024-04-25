exports.handleSubmission = async (req, res) => {
  try {
    const { ipfsHash, docId, caseId, docType, name, addr, role } = req.body;

    // Log the received data
    console.log("File hash:", ipfsHash);
    console.log("Document ID:", docId);
    console.log("Case ID:", caseId);
    console.log("Document Type:", docType);
    console.log("Name:", name);
    console.log("Address:", addr);
    console.log("Role:", role);

    // NOTE: docId and CaseId can be converted to int using parseInt(docId, 10) and parseInt(caseId, 10)

    // additional logic here, such as interacting with the blockchain contract

    res.status(200).json({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error handling submission:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
