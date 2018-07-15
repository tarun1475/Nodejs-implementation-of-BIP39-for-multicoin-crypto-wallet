const VirgilCrypto =require('virgil-crypto');
const bip39 = require('bip39');

var mnemonic = bip39.generateMnemonic();

const seed = bip39.mnemonicToSeedHex(mnemonic);


const virgilCrypto = new VirgilCrypto.VirgilCrypto();


const keyPair = virgilCrypto.generateKeysFromKeyMaterial(seed);

const privateKeyData = virgilCrypto.exportPrivateKey(keyPair.privateKey);
const publicKeyData = virgilCrypto.exportPublicKey(keyPair.publicKey);

console.log(mnemonic);
console.log(privateKeyData.toString('base64'));
console.log(publicKeyData.toString('base64'));

