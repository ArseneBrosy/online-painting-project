import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, set, get, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

let lastShowedUserUID;

const firebaseConfig = {
  databaseURL: "https://arsene-opp-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

onValue(ref(database), (snapshot) => {
  //map = snapshot.val();
});