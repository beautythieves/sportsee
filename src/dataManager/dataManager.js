/**
 * @typedef {import ('./typedef.js').mainData} mainData
 */

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
 
 /**
  * [@async]
  *
  * @param   {Number}  userId  [userId description]
  *
  * @return  {mainData}          [return description]
  */
  async function getUserMainData() {
   const rawUserData = useMockedData 
     ? mockedData.USER_MAIN_DATA 
     : await importFromBackEnd('');
   const userData = Object.values(rawUserData); // transforme l'objet en tableau
   return userData;
 }
 
 /* ajout simon*/
 export {getUserMainData};
 /*? ajout sur le m^me modèle export getuseractivity, average
 session...?*/ 
 async function getUserActivity() {
    const rawUserData = useMockedData 
      ? mockedData.USER_ACTIVITY 
      : await importFromBackEnd('');
    const userData = Object.values(rawUserData); // transforme l'objet en tableau
    return userData;
  }
  export {getUserActivity};

  async function getUserAverageSessions() {
    const rawUserData = useMockedData 
      ? mockedData.USER_AVERAGE_SESSIONS 
      : await importFromBackEnd('');
    const userData = Object.values(rawUserData); // transforme l'objet en tableau
    return userData;
  } 
  export {getUserAverageSessions};

  async function getUserPerformance() { 
    const rawUserData = useMockedData 
      ? mockedData.USER_PERFORMANCE 
      : await importFromBackEnd('');
    const userData = Object.values(rawUserData); // transforme l'objet en tableau
    return userData;
  } 
  export {getUserPerformance};