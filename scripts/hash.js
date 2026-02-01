import bcrypt from 'bcrypt';

const password = 'Admin123!';

const hash = await bcrypt.hash(password, 10);

console.log('PASSWORD:', password);
console.log('HASH:', hash);

// Test immédiat
const match = await bcrypt.compare(password, hash);
console.log('MATCH:', match);
