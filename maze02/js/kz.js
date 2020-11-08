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
function arr_filled(len,val)
{
    var a = [];
    for (var i=0; i<len; i++) a[i]=val;
    return a;
}
//------------------------------------------------------------------------------

function matrix_filled(rows,cols,val)
{
    var a = [];
    for (var i=0; i<rows; i++) a[i]=arr_filled(cols,val);
    return a;
}

function cube_filled(rows,cols,hh,val)
{
    var a = [];
    for (var i=0; i<rows; i++) a[i]=matrix_filled(cols,hh,val);
    return a;
}

//------------------------------------------------------------------------------
