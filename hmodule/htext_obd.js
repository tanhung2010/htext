let vscode = require('vscode');
var p_util = require('./htext_util.js');
var Range = vscode.Range;
 var enumchecksumtype = {
    cs:0,
    cs_invert:1,
    crc_j1850:2,
    cs_2byte:3,
}

function htextfunction_obd(e, d, sel) {
    var items = [];
    items.push({ label: "dtc to sae", description: "Parse HEX to SAE",funcb:dtc_tosae});
    items.push({ label: "dtc to hex", description: "parse SAE to Hex",funcb:dtc_saetohex});

    items.push({ label: "cs", description: "Calculate CS 1byte KWP2000 , ISO9141",funcb:arrayhex_cs});
    items.push({ label: "cs crc-j1850", description: "Calculate CRC J1850-VPW J1850-PWM",funcb:arrayhex_crc_j1850});

    items.push({ label: "cs invert", description: "Calculate CS-Invert 1byte",funcb:arrayhex_csinvert});
    items.push({ label: "cs 2byte", description: "Calculate CS 2byte",funcb:arrayhex_cs2byte});

    p_util.htext_handlemenu(items);
};

module.exports.htextfunction_obd =htextfunction_obd;


function dtc_tosae(e,d,sel)
{
    var dtccategory={0:"P",1:"C",2:"B",3:"U"};
    var rawdata= p_util.stringtohexarray(p_util.gettext_selection());
    var listdtcs = [];
    p_util.log_line("--------");
    for(var i =0;i<rawdata.length;i+=2)
    { 
        if((i+2)>rawdata.length)
        {
            p_util.log_line("remind data not parsed >> "+("00"+rawdata[i].toString(16)).slice(-2).toUpperCase());
            break;
        }
        var strdtc =dtccategory[(rawdata[i]>>6)&3];
        strdtc +=("00"+(rawdata[i]&0x3F).toString(16)).slice(-2)+("00"+(rawdata[i+1]).toString(16)).slice(-2);
        var strrawhex = ("00"+rawdata[i].toString(16)).slice(-2) +" "+("00"+rawdata[i+1].toString(16)).slice(-2);

        p_util.log_line((strrawhex + "\t>>\t"+strdtc).toUpperCase());

       
    }
}

function dtc_saetohex()
{
     var dtccategory={"P":0,"C":1,"B":2,"U":3};
     var txt = p_util.gettext_selection();
     txt= txt.replace(/[^0-9A-Fa-fPBCUpbcu]/g," ");
     txt = txt.replace(/\s+/g," ");
     var dtcs = txt.split(' ');
     for (var index = 0; index < dtcs.length; index++) {
         var element = dtcs[index].toUpperCase();
         if(element.length==5)
         {
            var dtcH=dtccategory[element[0]]<<6;
            dtcH|=parseInt(element.substr(1,2),16);
            
            p_util.log_line((dtcs[index] + "\t>>\t"+("00"+dtcH.toString(16)).slice(-2) +" "+element.substr(3,2)).toUpperCase());
         }
         else
         {
              p_util.log_line((dtcs[index] + " is ignored cause length <> 5"));
         }
     }
}



function getchecksum(ecs,data)
{
    var cs=0;
    switch(ecs)
    {
        case enumchecksumtype.cs:
        case enumchecksumtype.cs_invert:
        case enumchecksumtype.cs_2byte:
            for(var i=0;i<data.length;i++)
            {
                cs +=data[i];
            }
            if(ecs==enumchecksumtype.cs_invert)
            {
               cs= 0xFF -cs;
            }
            if(ecs==enumchecksumtype.cs_2byte)
            {
               return cs&0xFFFF;
            }
            else
            {
                return cs&=0xFF;
            }
        case enumchecksumtype.crc_j1850:
            var bCounter;
            var bIndex = 0;
            var iCRC = 0xFF;
            var iData;
            var bNumberData= data.length;
            while(bNumberData)
            {
                iData = data[bIndex++];
                bCounter = 0;
                while(bCounter < 8)
                {
                    iData <<= 1;
                    iCRC <<= 1;
                    if((iCRC & 0x0100) ^ (iData & 0x0100))
                    {
                        iCRC ^= 0x1D;//POLY;
                    }
                    bCounter++;
                }
                bNumberData--;
            }
            iCRC ^= 0xff;
            return (iCRC);
        default:
            break;
    }

    return -1;
}
function arrayhex_cs(e, d, sel)
{
    var txt = p_util.gettext_selection();
    var arrdata = p_util.stringtohexarray(txt);
    var cs= getchecksum(enumchecksumtype.cs,arrdata);
    p_util.log_line("cs:#"+ ("00"+cs.toString(16)).slice(-2));

}
function arrayhex_csinvert(e, d, sel)
{
    var txt = p_util.gettext_selection();
    var arrdata = p_util.stringtohexarray(txt);
    var cs= getchecksum(enumchecksumtype.cs_invert,arrdata);
    p_util.log_line("cs invert:#"+ ("00"+cs.toString(16)).slice(-2));
}
function arrayhex_cs2byte(e, d, sel)
{
    var txt = p_util.gettext_selection();
    var arrdata = p_util.stringtohexarray(txt);
    var cs= getchecksum(enumchecksumtype.cs_2byte,arrdata);
    p_util.log_line("cs 2byte:#"+ ("0000"+cs.toString(16)).slice(-4));
}
function arrayhex_crc_j1850(e, d, sel)
{
    var txt = p_util.gettext_selection();
    var arrdata = p_util.stringtohexarray(txt);
    var cs= getchecksum(enumchecksumtype.crc_j1850,arrdata);
    p_util.log_line("crc j1850:#"+ ("00"+cs.toString(16)).slice(-2));
}
