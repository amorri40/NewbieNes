function setNES(bin)
{
    $("#asmtbl").empty();

    nes = bin;
    if(nes[0] != 'N' ||
       nes[1] != 'E' ||
       nes[2] != 'S'){
        alert("Invalid .nes file");
        return;
    }
    var prg_page = nes.charCodeAt(4);
    var chr_page = nes.charCodeAt(5);
    var cb1 = nes.charCodeAt(6);
    var cb2 = nes.charCodeAt(7);
    mapper = cb1>>4;
    
    $("#prg_page").text(prg_page);
    $("#chr_page").text(chr_page);
    $("#mapper").text(mapper);

    // calc hash and get info
    var hash = $.sha1(nes);
    $.getJSON("rom.php", {hash:hash, req:Math.random()}, function(json){
        console.log("rom.php");
        console.log(json);
    romid = json.id;

    // get comment list from db
    $.getJSON("comment.php", {rom: romid, req:Math.random()}, function(json){
        console.log("get comment.php romid="+romid);
        comment = new Object();
        for(var j = 0; j < json.length; j++){
        var c = json[j];
        comment[c.address] = c.comment;
        }
        setBank(0);
        //load the editor effects such as clicking to show similar symbols
        setup_effects();
    });

    $("#download").attr("href", "comment.php?rom="+romid+"&csv=1");
    });

    var code_size = 32*1024;
    binary = nes.substr(16, code_size);

    var p = 0x7ffa;
    int_nmi = getword(p); p += 2;
    int_reset = getword(p); p += 2;
    int_irq = getword(p); p += 2;

    if(int_nmi == 0) int_nmi = 0x8000;
    if(int_reset == 0) int_reset = 0x8000;
    if(int_irq == 0) int_irq = 0x8000;

    $("#int_nmi").get(0).value = hexword(int_nmi);
    $("#int_reset").get(0).value = hexword(int_reset);
    $("#int_irq").get(0).value = hexword(int_irq);


    for(var i = 0; i < 8; i++){
    var b = $("#bank"+i);
    if(i < prg_page){
        b.removeAttr("disabled");
        b.click = function(e){
        alert("A");
        };
    }else{
        b.attr("disabled", "disabled");
    }
    }



}