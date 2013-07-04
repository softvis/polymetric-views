start     = _ open _ nodes:node* _ close _                { return nodes; }
node      = open _ type:famixtype _ attrs:attr* _ close _ { return MSE.setNodeAttributes(type, attrs);  }
famixtype = "FAMIX." typename:chars                       { return typename; }
attr      = open _ key:key _ value:value _ close _      	{ var o = {}; o["key"] = key; o["val"] = value; return o; }
value     = chars / string / attr
open      = '('
close     = ')'
string    = del str:([^\'\" \t\n\r] / [ ])* del { return str.join(""); }
del       = "'" / '"'
key       = chars:[^:()\'\" \t\n\r]+[:]? { return chars.join(""); }
chars     = chars:char+ { return chars.join(""); }
char      = [^()\'\" \t\n\r]
int       = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
_         = space*
space     = [ \t\n\r]
