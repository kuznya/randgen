function print(s) { document.write(s+'<br>\n'); }
function rand(limit) { return (Math.random()*limit)|0; }

function choice(abc) {
    const idx = rand(abc.length);
    return abc[idx];
}

function repeat(f ,times) {
    for (let i=0; i < times; i++) {
        f(i);
    }
}

const abc_36        = '0123456789abcdefghijklmnopqrstuvwxyz';
const abc_base64    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const abc_nato      = [
    'alpha',    'bravo',    'charlie',  'delta',
    'echo',     'foxtrot',  'golf',     'hotel',
    'india',    'juliet',   'kilo',     'lima',
    'mike',     'november', 'oscar',    'papa',
    'quebec',   'romeo',    'sierra',   'tango',
    'uniform',  'victor',   'whiskey',  'x-ray',
    'yankee',   'zulu'
];

function randstr(abc, cnt) {
    let a = [];
    for (let i=0; i<cnt; i++) {
        const s = choice(abc);
        a.push(s)
    }
    return a.join('');
}
