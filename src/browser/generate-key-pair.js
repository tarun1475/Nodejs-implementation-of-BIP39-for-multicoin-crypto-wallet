import _ from 'lodash';
import VirgilCrypto from '../utils/crypto-module';
import * as CryptoUtils from '../utils/crypto-utils';
import KeysTypesEnum from './keys-types-enum';
import { throwVirgilError, throwValidationError } from '../utils/crypto-errors';

/**
 * Generate the key pair - public and private keys
 *
 * @param [password = ''] {string}
 * @param [keysType = 'ecBrainpool512'] {string}
 * @returns {{publicKey: *, privateKey: *}}
 */
export function generateKeyPair (password, keysType) {
	switch (arguments.length) {
		case 1:
			password = arguments[0];
			keysType = KeysTypesEnum.ecBrainpool512;
			break;

		case 2:
			password = arguments[0];
			keysType = KeysTypesEnum(arguments[1]);
			break;

		case 0:
		default:
			password = '';
			keysType = KeysTypesEnum.ecBrainpool512;
			break;
	}

	if (!_.isString(password)) {
		throwValidationError('00001', { arg: 'password', type: 'String' });
	}

	if (_.isUndefined(keysType)) {
		throwValidationError('00002', { arg: 'keysType', type: `equal to one of ${_.values(KeysTypesEnum).join(', ')} - use the KeysTypesEnum for it.` });
	}

	let virgilKeys;
	let publicKey;
	let privateKey;

	try {
		let passwordByteArray = CryptoUtils.toByteArray(password);
		virgilKeys = VirgilCrypto.VirgilKeyPair[keysType](passwordByteArray);

		publicKey = virgilKeys.publicKey().toUTF8();
		privateKey = virgilKeys.privateKey().toUTF8(virgilKeys);

		// cleanup memory to avoid memory leaks
		passwordByteArray.delete();
		virgilKeys.delete();
	} catch (e) {
		throwVirgilError('90007', { password: password });
	}

	return { publicKey, privateKey };
}

export default generateKeyPair;
