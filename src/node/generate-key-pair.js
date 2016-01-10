var _ = require('lodash');
var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

/**
 * Generate the key pair - public and private keys
 *
 * @param [password = ''] {string}
 * @param [keysType = 'ecBrainpool512'] {string}
 * @returns {{publicKey: *, privateKey: *}}
 */
module.exports = function generateKeyPair(password, keysType) {
	if (!_.isString(password)) {
		throw new TypeError('The argument `password` must be a String');
	}

	if (_.isUndefined(keysType)) {
		throw new TypeError('The argument `keysType` must be an equal to one of ' + _.values(KeysTypesEnum).join(', ') + ' - use the KeysTypesEnum for it.');
	}

	var virgilKeys;

	if (password) {
		virgilKeys = new VirgilCrypto.VirgilKeyPair[keysType](u.stringToByteArray(password));
	} else {
		virgilKeys = new VirgilCrypto.VirgilKeyPair[keysType]();
	}

	return {
		privateKey: u.byteArrayToString(virgilKeys.privateKey()),
		publicKey: u.byteArrayToString(virgilKeys.publicKey())
	};
};
