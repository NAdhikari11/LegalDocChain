// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract DocumentVault {
    address public admin;

    struct Document {   
        uint caseId;
        uint docId;
        string docType;
        string docContent;
        address[] owner;
        address creator;
    }

    struct User {
        string name;
        address addr;
        string role;
    }

    mapping (uint => uint[]) private caseIdToDocuments;
    mapping (uint => Document) private idToDocuments;
    mapping (address => User) private addressToUsers;
    mapping (address => uint[]) private addressToDocId;
    mapping (string docContent => uint) private docContentToId;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Sorry, you are not the admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function getMyDocIds(address _addr) external view returns (uint[] memory) {
        return addressToDocId[_addr];
    }

    function getDocIdByCaseId(uint _caseId) external view returns (uint[] memory) {
        return caseIdToDocuments[_caseId];
    }

    function getDocumentByDocId(uint _docId) external view returns (uint, uint, string memory, string memory) {
        Document storage myDoc = idToDocuments[_docId];
        require(bytes(myDoc.docContent).length > 0, "Sorry, document not found");

        return (myDoc.docId, myDoc.caseId, myDoc.docType, myDoc.docContent);
    }

    function getDocumentByCaseId(uint _caseId) external view returns (uint[] memory docIds, string[] memory docTypes, string[] memory docContents) {
        uint[] storage documentIds = caseIdToDocuments[_caseId];  // Get the document IDs associated with the case
        uint numDocs = documentIds.length;

        // Create arrays to hold document types and contents
        string[] memory types = new string[](numDocs);
        string[] memory contents = new string[](numDocs);

        for (uint i = 0; i < numDocs; i++) {
            uint docId = documentIds[i];  // Get document ID
            Document storage myDoc = idToDocuments[docId];  // Retrieve document by ID

            types[i] = myDoc.docType;       // Store document type
            contents[i] = myDoc.docContent; // Store document content
        }

        return (documentIds, types, contents);
    }


    function storeDocument(
        uint _caseId,
        uint _docId,
        string memory _docType,
        string memory _docContent,
        address _owner,
        address _creator
    ) external {
        
        address[] memory temp = new address[](1);
        temp[0] = _owner;

        Document memory myDocument = Document({
            caseId: _caseId,
            docId: _docId,
            docType: _docType,
            docContent: _docContent,
            owner: temp,
            creator: _creator
        });

        addressToDocId[_owner].push(_docId);
        if(_owner != _creator) {
            addressToDocId[_creator].push(_docId);
        }

        idToDocuments[_docId] = myDocument;
        caseIdToDocuments[_caseId].push(_docId);
        docContentToId[_docContent] = _docId;
    }

    function getUser(address _addr) external view returns (string memory, address, string memory) {
        require(addressToUsers[_addr].addr != address(0), "Sorry user does not exist");

        User storage myUser = addressToUsers[_addr];
        return (myUser.name, myUser.addr, myUser.role);
    }

    function createUser(string memory _name, address _addr) external onlyAdmin {
        require(addressToUsers[_addr].addr == address(0), "Sory, user with this address already exists!");

        addressToUsers[_addr] = User({
            name: _name,
            addr: _addr,
            role: "General"
        });
    }

    function getDocumentByUser() external view returns (uint[] memory docIds, uint[] memory caseIds, string[] memory docTypes, string[] memory docContents) {
        uint[] storage documentIds = addressToDocId[msg.sender];  // Fetch document IDs for the user
        uint numDocs = documentIds.length;

        uint[] memory cases = new uint[](numDocs);
        string[] memory types = new string[](numDocs);
        string[] memory contents = new string[](numDocs);

        for (uint i = 0; i < numDocs; i++) {
            uint docId = documentIds[i];  
            Document storage myDoc = idToDocuments[docId]; 

            cases[i] = myDoc.caseId;      
            types[i] = myDoc.docType;      
            contents[i] = myDoc.docContent; 
        }

        return (documentIds, cases, types, contents);
    }
}