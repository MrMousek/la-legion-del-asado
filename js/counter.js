import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, onDisconnect, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXbhRJf3105-3vAjdLPOIqbqFHF1R796E",
    authDomain: "la-legion-del-asado.firebaseapp.com",
    databaseURL: "https://la-legion-del-asado-default-rtdb.firebaseio.com",
    projectId: "la-legion-del-asado",
    storageBucket: "la-legion-del-asado.firebasestorage.app",
    messagingSenderId: "274490441980",
    appId: "1:274490441980:web:701aa2041be5e543091779",
    measurementId: "G-0M4BYCT8FC"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const presenceRef = ref(db, "online_users");
const connectedRef = ref(db, ".info/connected");

onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
        const myPresenceRef = push(presenceRef);
        onDisconnect(myPresenceRef).remove();
        set(myPresenceRef, true);
    }
});

onValue(presenceRef, (snap) => {
    const count = snap.exists() ? Object.keys(snap.val()).length : 0;
    const counterElement = document.getElementById("live-counter-text");
    
    if (counterElement) {
        counterElement.innerText = `${count} ${count === 1 ? 'adalid viendo' : 'heroes de azeroth viendo'} la web`;
    }
});