/*
 These functions return true or false based on the type of the opcode
*/

function isZeroPage(opcode)
{
    var low = (opcode & 15);
    if(low == 1 || low == 4 || low == 5 || low == 6){
    return true;
    }
    return false;
}
function isImmediate(opcode)
{
    var high = (opcode >> 4);
    var low = (opcode & 15);
    var hp = (high&1);
    
    if(opcode == 0xa0 || opcode == 0xc0 || opcode == 0xe0 ||
     low == 2 || (low == 9 && hp == 0)){
    return true;
    }
    return false;
}
function isAbsolute(opcode)
{
    var low = (opcode & 15);
    
    
    if(low == 9 || low == 0xd || low == 0xe || low == 12){  // absolute (12 adds the bit fix)
    return true;
    }
    return false;
}
function isJumpAbs(opcode)
{
    // JSR, JMP
    if(opcode == 0x20 || opcode == 0x4c || opcode == 0x6c /*indirect*/ ){
    return true;
    }
    return false;
}
function isJumpRel(opcode)
{
    var high = (opcode >> 4);
    var low = (opcode & 15);
    var hp = (high&1);
    
    if(low == 0 && hp ==1){
    return true;
    }
    return false;
}
function isReturn(opcode)
{
    // RTS, JMP, RTI
    if(opcode == 0x60 || opcode == 0x4c || opcode == 0x6c || opcode == 0x40){
    return true;
    }
    return false;
}