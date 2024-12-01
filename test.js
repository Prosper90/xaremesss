import http from "http";

const API_BASE = "http://localhost:3000/api/v1";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQ5YWUyMTJhZDFkZDM1OTgyYzA4NyIsImlhdCI6MTczMTA0Mjk4OSwiZXhwIjoxNzMxMDUwMTg5fQ.TotafNQ_Wnk-4fw0DyvnuPj4nCKPAAHBzCyRQrOZvd0";

function apiRequest(endpoint, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: `${API_BASE}${endpoint}`,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const req = http.request(options, (res) => {
      let data = "";

      // Collect response data
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Parse and handle response
      res.on("end", () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          reject(new Error("Failed to parse JSON response"));
        }
      });
    });

    // Handle request errors
    req.on("error", (error) => {
      reject(new Error(`Request error: ${error.message}`));
    });

    // Send request body if present
    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

// Test functions
async function loginTest() {
  const loginData = {
    id: 1234567890,
    username: "dark9t",
    first_name: "Mr Dark9t",
  };

  const queryString = Object.keys(loginData)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(loginData[key])}`
    )
    .join("&");

  const result = await apiRequest(`/auth/authenticate?${queryString}`, "POST");

  console.log("Login Test Response:", result);
  if (result.status !== 200) {
    console.error("Failed to authenticate:", result);
  }

  // Return token if needed for further tests
  return result.data && result.data.token;
}

// loginTest().catch(console.error);
async function addVault() {
  const vaultData = {
    valueName: "Test Vault",
    imageUrl: "http://example.com/vault-image.jpg",
    suspend: false,
    achievements: ["badge1", "badge2"],
    requirements: ["requirement1"],
    metadata: { description: "Sample metadata" },
  };

  const result = await apiRequest("/add-vault", "POST", vaultData);
  console.log("Add Vault:", result);
  return result.data._id;
}

async function getVaults() {
  const result = await apiRequest("/get-all-vaults");
  console.log("Get All Vaults:", JSON.stringify(result, null, 2));
}

async function getVaultById(vaultId) {
  const result = await apiRequest(`/${vaultId}/get-vault`);
  console.log("Get Vault by ID:", JSON.stringify(result, null, 2));
}

async function updateVault(vaultId) {
  const updatedData = {
    valueName: "Updated Vault Name",
    achievements: ["updatedBadge1", "updatedBadge2"],
  };

  const result = await apiRequest(
    `/${vaultId}/update-vault`,
    "PUT",
    updatedData
  );
  console.log("Update Vault:", JSON.stringify(result, null, 2));
}

async function suspendVault(vaultId) {
  const updatedData = {
    isSuspended: false,
  };
  const result = await apiRequest(
    `/${vaultId}/suspend-vault`,
    "PATCH",
    updatedData
  );
  console.log("Suspend Vault:", JSON.stringify(result, null, 2));
}

async function deleteVault(vaultId) {
  const result = await apiRequest(`/${vaultId}/delete-vault`, "DELETE");
  console.log("Delete Vault:", JSON.stringify(result, null, 2));
}

async function runTests() {
  console.log("Starting Vault API tests...");

  const vaultId = "672382fc74f70a939a02ea6d";
  //   console.log(vaultId, "asdfadasd");
  //   await getVaults();
  await getVaultById(vaultId);
  //   await updateVault(vaultId);
  //   await suspendVault(vaultId);
  //   await deleteVault(vaultId);

  console.log("Vault API tests completed.");
}

// runTests();

// loginTest();

/* 
-  FETCH ALL XEETS by a user
-  now for users to get xeetscore they have to mint the numberOfImpressionPerAccount and divide by 1million
- also they can input the numberOfImpressionPerAccount they want to mint 
for instance i have 1000000000 numberOfImpressionPerAccount and i want to mint only 5000
it will 5000/1m remove 5000 from numberOfImpressionPerAccount
-  

 */

// Login Test Response: {
//   status: 200,
//   data: {
//     message: 'User authenticated successfully.',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQ5YWUyMTJhZDFkZDM1OTgyYzA4NyIsImlhdCI6MTczMTA0Mjk4OSwiZXhwIjoxNzMxMDUwMTg5fQ.TotafNQ_Wnk-4fw0DyvnuPj4nCKPAAHBzCyRQrOZvd0'
//   }
// }

async function getXeets() {
  const result = await apiRequest("/xeets/672d9ae212ad1dd35982c087/fetch-all");
  console.log("Res:", JSON.stringify(result, null, 2));
}

// getXeets();

/* 


now lets build another endpoint to claim Arme

now to claim arme Users have to use gema to purchase incubateXeetCard cost 10 gema
then after that it takes 24hrs to incubate 
then after the incubation is done users will generate $arme using 25 gema 
it takes another 24hrs 
then after that users will extractToTon using 25gema it takes 48hrs 

then after that it credits the ton wallet 

depends on the rate 

1xeet === 0.0005 Arme for example 




*/
