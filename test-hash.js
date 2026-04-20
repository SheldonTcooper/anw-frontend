const bcrypt = require('bcryptjs'); bcrypt.hash('@#Web2026@#', 10).then(h => { console.log('HASH:', h); bcrypt.compare('@#Web2026@#', h).then(r => console.log('Valido:', r)); });
