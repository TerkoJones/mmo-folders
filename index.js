'use strict'

const path = require('path');
const url = require('url');
const prop = Object.defineProperty;
const slashRex = /[\/|\\]/g;
const relRex = /^\.?[\/|\\]/;
const keyRex = /([\w|_]+)([\/|\\])?(.*)?/g
const symParent = Symbol("parent");
const symRoot = Symbol("root");

module.exports = exports = create_folders;
exports.MAIN = path.parse(require.main.filename).dir;

function create(root, def) {

    const folders = create_folders(root);

    Object.keys(def).forEach(k => {
        let it = resolve_folder(folders, root, k, def[k]);
        prop(folders, k, {
            value: path.join.bind(path, it),
            enumerable: true,
            writable: false,
            configurable: false
        })
    })
    def = null;
    return folders;
}

function create_folders(root, def) {
    const folders = function (key, ...args) {
        if (!key) return folders[symRoot]();
        let it = folders[key];
        if(!it) {
            args.unshift(key);
            it=folders[symRoot];
        }
        return it(...args);
    }
    if(typeof root!=='string') { // asume root como def
        def=root;
        root=''
    }
    prop(folders, symRoot, {
        value: path.join.bind(path, root),
        enumerable: false,
        writable: false,
        configurable: false
    });
    prop(folders, 'extend', {
        value: (key, rel) => {
            if (typeof key === 'string') {
                rel = resolve_folder(folders, root, key, rel);
                prop(folders, key, {
                    value: path.join.bind(path, rel),
                    enumerable: true,
                    writable: false,
                    configurable: false
                })
            } else { // asume objeto pares key-rel
                Object.keys(def).forEach(k => folders.extend(k, def[k]));
            }
        },
        enumerable: true,
        writable: false,
        configurable: false
    });
    if (def) folders.extend(def);
    def = null;
    return folders;
}

function resolve_folder(owner, root, key, rel) {
    const lev = rel.split(slashRex);
    let l = lev.length,
        fn;
    if (!l) throw new Error("No ha niveles");
    if (!lev[0] || lev[0] === '.') {
        lev[0] = root;
    } else {
        fn = owner[lev[0]];
        if (!fn) throw new Error("No existe " + lev[0]);
        lev[0] = fn();
        if (l === 1) lev.push(key);
    }
    l--;
    if (l > 0 && lev[l] === '') lev[l] = key;
    return path.join(...lev);
};

function parse(key, rel) {
    let levels = rel.split();
    return levels;
}