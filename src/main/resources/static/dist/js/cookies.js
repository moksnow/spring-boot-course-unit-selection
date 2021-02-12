/*
 * BoostanCookies.js - 1.2.3
 * https://github.com/ScottHamper/BoostanCookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('BoostanCookies.js requires a `window` with a `document` object');
        }

        var BoostanCookies = function (key, value, options) {
            return arguments.length === 1 ?
                BoostanCookies.get(key) : BoostanCookies.set(key, value, options);
        };

        // Allows for setter injection in unit tests
        BoostanCookies._document = window.document;

        // Used to ensure cookie keys do not collide with
        // built-in `Object` properties
        BoostanCookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)
        
        BoostanCookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

        BoostanCookies.defaults = {
            path: '/',
            secure: false
        };

        BoostanCookies.get = function (key) {
            if (BoostanCookies._cachedDocumentCookie !== BoostanCookies._document.cookie) {
                BoostanCookies._renewCache();
            }
            
            var value = BoostanCookies._cache[BoostanCookies._cacheKeyPrefix + key];

            return value === undefined ? undefined : decodeURIComponent(value);
        };

        BoostanCookies.set = function (key, value, options) {
            options = BoostanCookies._getExtendedOptions(options);
            options.expires = BoostanCookies._getExpiresDate(value === undefined ? -1 : options.expires);

            BoostanCookies._document.cookie = BoostanCookies._generateCookieString(key, value, options);

            return BoostanCookies;
        };

        BoostanCookies.expire = function (key, options) {
            return BoostanCookies.set(key, undefined, options);
        };

        BoostanCookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || BoostanCookies.defaults.path,
                domain: options && options.domain || BoostanCookies.defaults.domain,
                expires: options && options.expires || BoostanCookies.defaults.expires,
                secure: options && options.secure !== undefined ?  options.secure : BoostanCookies.defaults.secure
            };
        };

        BoostanCookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };

        BoostanCookies._getExpiresDate = function (expires, now) {
            now = now || new Date();

            if (typeof expires === 'number') {
                expires = expires === Infinity ?
                    BoostanCookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }

            if (expires && !BoostanCookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        };

        BoostanCookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        };

        BoostanCookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = BoostanCookies._getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[BoostanCookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[BoostanCookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        };

        BoostanCookies._getKeyValuePairFromCookieString = function (cookieString) {
            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
            var separatorIndex = cookieString.indexOf('=');

            // IE omits the "=" when the cookie value is an empty string
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

            var key = cookieString.substr(0, separatorIndex);
            var decodedKey;
            try {
                decodedKey = decodeURIComponent(key);
            } catch (e) {
                if (console && typeof console.error === 'function') {
                    console.error('Could not decode cookie with key "' + key + '"', e);
                }
            }
            
            return {
                key: decodedKey,
                value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
            };
        };

        BoostanCookies._renewCache = function () {
            BoostanCookies._cache = BoostanCookies._getCacheFromString(BoostanCookies._document.cookie);
            BoostanCookies._cachedDocumentCookie = BoostanCookies._document.cookie;
        };

        BoostanCookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = BoostanCookies.set(testKey, 1).get(testKey) === '1';
            BoostanCookies.expire(testKey);
            return areEnabled;
        };

        BoostanCookies.enabled = BoostanCookies._areEnabled();

        return BoostanCookies;
    };
    var cookiesExport = (global && typeof global.document === 'object') ? factory(global) : factory;

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return cookiesExport; });
    // CommonJS/Node.js support
    } else if (typeof exports === 'object') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.BoostanCookies = cookiesExport;
    } else {
        global.BoostanCookies = cookiesExport;
    }
})(typeof window === 'undefined' ? this : window);