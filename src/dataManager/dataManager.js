const server = "http://localhost:3000/user"
const useMockedData = !window.location.search.includes("mockedData");
let mockedData = {
  USER_MAIN_DATA: {},
  USER_ACTIVITY: {},
  USER_AVERAGE_SESSIONS: {},
  USER_PERFORMANCE: {},
};
if (useMockedData) importData();

async function importFromBackEnd(endPoint){
    const response = await fetch(server +endPoint);
    return await response.json();
}
async function importData() {
  mockedData = await import("./data.js");
}

async function getUserMainData(userId) {
  const  rawUserMainData = useMockedData 
    ? mockedData.USER_MAIN_DATA 
    : await importFromBackEnd(userId);
    const userMainData = {...rawUserMainData} //données traitées
    return userMainData;
}
/* ajout simon*/
export {getUserMainData};