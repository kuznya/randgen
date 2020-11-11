//------------------------------------------------------------------------------
function print(s)   { document.write(s+'<br/>\n'); }

//------------------------------------------------------------------------------
function write(s)   { document.write(s); }

//------------------------------------------------------------------------------
function writeln(s) { document.write(s+'\n'); }

//------------------------------------------------------------------------------
function hash_copy(a)
{
    var r = {};
    for (k in a)
    {
        if (a.hasOwnProperty(k))
        { r[k] = a[k]; }  
    }
    return r;
}

//------------------------------------------------------------------------------
function hash_toString(a)
{
    var s = '';
    var aa = hash_copy(a);
    for (k in aa)
    {
        s += aa[k]+', ';
    }
    return s;
}

//------------------------------------------------------------------------------
function arr_filled(len, fval)
{
    const a = []
    for (let i=0; i < len; i++) a.push(fval())
    return a
}
//------------------------------------------------------------------------------

function matrix_filled(rows, cols, fval)
{
    const a = []
    for (let i=0; i < rows; i++) a.push(arr_filled(cols, fval))
    return a
}

function cube_filled(rows, cols, hh, fval)
{
    const a = []
    for (let i=0; i < rows; i++) a.push(matrix_filled(cols, hh, fval))
    return a
}

//------------------------------------------------------------------------------
