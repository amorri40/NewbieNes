function addLine(address, label, code, asm, operand, comment)
{
    if (asm=="db") label="Data_"+hexword(address);
    var row = $("<tr/>", {
    addr:address
    });
    row.append($("<td/>").text(label));
    //row.append($("<td/>").text(code)); amorri40 simplify output
    row.append($("<td class='asm'/>").text(asm));
    row.append($("<td class='opr'/>").text(operand));

    //amorri40 edit to add naturalizer
    row.append($("<td class='naturalized'/>").append(getNaturalized(asm,operand)));

    //append to text area
    if (asm!="db")  {
        if (label!="\t") label = "\n\n"+label
        $('#asmtextarea').append(label+"\n\t"+asm+" "+operand);
    }

    var td = $("<td>", {text:comment});
    td.bind("click", editComment);
    row.append(td);

    $("#asmtbl").append(row);
}