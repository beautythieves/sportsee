/**
 * @typedef {import ('./typedef.js').mainData} mainData
 */

// Define the server URL and check if the application should use mocked data
const server = "http://localhost:3000/user";
const useMockedData = window.location.search.includes("mockedData");

// Initialize an object to store mocked data if it is used
let  mockedData = {
  USER_MAIN_DATA: {},
  USER_ACTIVITY: {},
  USER_AVERAGE_SESSIONS: {},
  USER_PERFORMANCE: {},
};

// If using mocked data, call the importMockedData function to import it
// if (useMockedData) importMockedData();

/**
 * Fetch data from the backend server.
 * @param {string} endPoint - The endpoint to fetch data from.
 * @returns {Promise<Object>} - The fetched data.
 */
async function importFromBackEnd(endPoint, id) {
  if (endPoint !== '') endPoint = '/' + endPoint; 
  const response = await fetch(server +"/" + id + endPoint);
  const data = await response.json();
  return data.data
    ?data.data
    :data;
}

/**
 * Import mocked data from the data.js file.
 */
async function importMockedData() {
  mockedData = await import("./data.js");
}

/**
 * Fetches user main data from the server or mocked data.
 * @async
 * @param {Number} userId - The user ID.
 * @return {mainData} - The user's main data.
 */
async function getUserMainData(id) {
  // Get raw user data, either from the mocked data or from the backend server
  const rawUserData = useMockedData
    ? await getMockedData("USER_MAIN_DATA",id)
    : await importFromBackEnd('', id);
  // Transform the object into an array and return it
  // const userData = Object.values(rawUserData);
  return rawUserData;
}

export { getUserMainData };

/**
 * Fetches user activity data from the server or mocked data.
 * @async
 * @returns {Array} - The user activity data.
 */
async function getUserActivity(id) {
  const rawUserData = useMockedData
    ? await getMockedData("USER_ACTIVITY", id)
    : await importFromBackEnd('activity', id);
  const userData = Object.values(rawUserData); // Transform the object into an array
  return userData;
}

export { getUserActivity };

/**
 * Fetches user average sessions data from the server or mocked data.
 * @async
 * @returns {Array} - The user average sessions data.
 */
async function getUserAverageSessions(id) {
  const rawUserData = useMockedData
    ? await getMockedData("USER_AVERAGE_SESSIONS", id)
    : await importFromBackEnd('average-sessions',id);
  const userData = Object.values(rawUserData); // Transform the object into an array
  return userData;
}

export { getUserAverageSessions };

/**
 * Fetches user performance data from the server or mocked data.
 * @async
 * @returns {Array} - The user performance data.
 */
async function getUserPerformance(id) {
  const rawUserData = useMockedData
    ? await getMockedData("USER_PERFORMANCE", id)
    : await importFromBackEnd('performance', id);
    console.log("RAW USER DATA: ", rawUserData )
  // const userData = Object.values(rawUserData); // Transform the object into an array
  return rawUserData;
}

async function getMockedData(src, userId){
  if (Object.keys(mockedData[src]).length === 0) await importMockedData()
  const data = mockedData[src].find((u) => u.userId === parseInt(userId));
  console.log(data, mockedData[src], mockedData, src);
  return data
}


export { getUserPerformance };
