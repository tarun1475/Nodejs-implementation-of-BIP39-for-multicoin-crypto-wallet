# Real use case of Bip39 with Virgil Security JavaScript Crypto Library 

[![Build Status](https://travis-ci.org/VirgilSecurity/virgil-crypto-javascript.svg)](https://travis-ci.org/VirgilSecurity/virgil-crypto-javascript) 
[![npm](https://img.shields.io/npm/v/virgil-crypto.svg)](https://www.npmjs.com/package/virgil-crypto)
[![GitHub license](https://img.shields.io/badge/license-BSD%203--Clause-blue.svg)](https://github.com/VirgilSecurity/virgil/blob/master/LICENSE)

### [Introduction](#introduction) | [Library purposes](#library-purposes) | [Usage examples](#usage-examples) | [Installation](#installation) | [Docs](#docs) | [License](#license) | [Contacts](#support)

## Introduction
We often use Bip39 to generate Mnemonic(Human readable digest) for bitcoin and other crypto wallets.There is a need of a library which make use of BIP39 in use cases  like multicoin crypto wallet and other application which are external from blockchain.I have made use of both the best libraries to implement such kind of features.

VirgilCrypto is a stack of security libraries (ECIES with Crypto Agility wrapped in Virgil Cryptogram) and an open-source high-level [cryptographic library](https://github.com/VirgilSecurity/virgil-crypto) that allows you to perform all necessary operations for securely storing and transferring data in your digital solutions. Crypto Library is written in C++ and is suitable for mobile and server platforms.

Virgil Security, Inc., guides software developers into the forthcoming security world in which everything will be encrypted (and passwords will be eliminated). In this world, the days of developers having to raise millions of dollars to build a secure chat, secure email, secure file-sharing, or a secure anything have come to an end. Now developers can instead focus on building features that give them a competitive market advantage while end-users can enjoy the privacy and security they increasingly demand.



## Library purposes
* Asymmetric Key Generation
* Encryption/Decryption of data
* Generation/Verification of digital signatures

## Usage examples
#### Generate a key pair using BIP39 Mnemonic seed to generate same key pairs by providing same seed.

```javascript
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
```

#### Generate a key pair

Generate a Private Key with the default algorithm (EC_X25519):

```javascript
const VirgilCrypto =require('virgil-crypto');

const virgilCrypto = new VirgilCrypto.VirgilCrypto();
const keyPair = virgilCrypto.generateKeys();
```

#### Generate and verify a signature

Generate signature and sign data with a private key:

```javascript
const VirgilCrypto =require('virgil-crypto');

const virgilCrypto = new VirgilCrypto.VirgilCrypto();
const signingKeypair = virgilCrypto.generateKeys();

// prepare a message
const messageToSign = 'Hello, Bob!';

// generate a signature
const signature = virgilCrypto.calculateSignature(messageToSign, signingKeypair.privateKey);
// signature is a NodeJS Buffer (or polyfill if in the browser)
console.log(signature.toString('base64'));
```

Verify a signature with a public key:

```javascript
// verify a signature
const verified = virgilCrypto.verifySignature(messageToSign, signature, signingKeypair.publicKey);
```

#### Encrypt and decrypt data

Encrypt Data on a Public Key:

```javascript
const VirgilCrypto =require('virgil-crypto');

const virgilCrypto = new VirgilCrypto.VirgilCrypto();
const encryptionKeypair = virgilCrypto.generateKeys();

// prepare a message
const messageToEncrypt = 'Hello, Bob!';

// encrypt the message
const encryptedData = virgilCrypto.encrypt(messageToEncrypt, encryptionKeypair.publicKey);
// encryptedData is a NodeJS Buffer (or polyfill if in the browser)
console.log(encryptedData.toString('base64'));
```

Decrypt the encrypted data with a Private Key:

```javascript
// decrypt the encrypted data using a private key
const decryptedData = virgilCrypto.decrypt(encryptedData, encryptionKeypair.privateKey);

// convert Buffer to string
const decryptedMessage = decryptedData.toString('utf8');
```

Need more examples? Visit our [developer documentation](https://developer.virgilsecurity.com/docs/how-to#cryptography).
  
## Installation

### Git Clone Repo



### NPM

Install BIP39 
```sh
npm install bip39 --save
```

> **Important!** You will need Node.js version >= 4.5.0 < 5 or >= 6 to use virgil-crypto.
If you have a different version, consider upgrading, or use [nvm](https://github.com/creationix/nvm) 
(or a similar tool) to install Node.js of supported version alongside your current installation.  
If you only intend to use virgil-crypto in a browser environment, you can ignore this warning.



## Docs
- [API Reference](http://virgilsecurity.github.io/virgil-crypto-javascript/)
- [Crypto Core Library](https://github.com/VirgilSecurity/virgil-crypto)
- [More usage examples](https://developer.virgilsecurity.com/docs/how-to#cryptography)

## License
This library is released under the [3-clause BSD License](LICENSE).

