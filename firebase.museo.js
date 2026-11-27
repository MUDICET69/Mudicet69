(function () {
  const FBURL = 'https://www.gstatic.com/firebasejs/10.12.1/';
  const CONFIG = {
    apiKey: 'AIzaSyAZ3EV-CTyH3bdPeMTcPAexWLmRLmoCSEg',
    authDomain: 'amprg-28da9.firebaseapp.com',
    projectId: 'amprg-28da9',
    storageBucket: 'amprg-28da9.firebasestorage.app',
    messagingSenderId: '425308243013',
    appId: '1:425308243013:web:40661cf1b6fccb1ed50f2c'
  };

  let promesa = null;
  const cargar = () => {
    if (!promesa) {
      promesa = (async () => {
        const [app, fs] = await Promise.all([
          import(FBURL + 'firebase-app.js'),
          import(FBURL + 'firebase-firestore-lite.js')
        ]);
        const a = app.getApps().length ? app.getApp() : app.initializeApp(CONFIG);
        return Object.assign({ db: fs.getFirestore(a) }, fs);
      })();
      promesa.catch(() => { promesa = null; });
    }
    return promesa;
  };

  const ms = d => {
    const c = d.data().creado;
    return c && c.toMillis ? c.toMillis() : 0;
  };


  async function aprobados(coleccion, max) {
    const S = await cargar();
    try {
      const q = S.query(S.collection(S.db, coleccion), S.where('aprobado', '==', true),
        S.orderBy('creado', 'desc'), S.limit(max));
      return (await S.getDocs(q)).docs;
    } catch (e) {
      const sinIndice = e && (e.code === 'failed-precondition' || /index/i.test(e.message || ''));
      if (!sinIndice) throw e;
      console.warn('[museo] Crea el índice (aprobado ↑, creado ↓) en la colección "' + coleccion +
        '" para cargar más rápido. Enlace de Firebase:', e.message);
      const q = S.query(S.collection(S.db, coleccion), S.where('aprobado', '==', true), S.limit(300));
      const docs = (await S.getDocs(q)).docs;
      docs.sort((a, b) => ms(b) - ms(a));
      return docs.slice(0, max);
    }
  }

  window.NUBE = { cargar, aprobados, ms };
})();
