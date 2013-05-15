function naturalized_to_html(str) {
    if (str=="x_register") return "<x>"+str+"</x>";
    if (str=="y_register") return "<y>"+str+"</y>";
    if (str=="accumulator") return "<accumulator>"+str+"</accumulator>";
    if (str=="if") return "<if>"+str+"</if>";
}

function getNaturalized(asm,operand){
    operand = operand.replace("#$","0x").replace("#","").replace(","," + ")


    if (asm=="sei") return "(Dis/En)able interupt status";
    if (asm=="cld") return "disable decimal mode";
    if (asm=="sei") return "Set Carry";
    if (asm=="pha") return "Stack.Push(accumulator)";

    if (asm=="pla") return naturalized_to_html("accumulator")+" = Stack.PullByte()";

    if (asm=="txs") return "Stack_pointer = "+naturalized_to_html("x_register");
    if (asm=="txa") return naturalized_to_html("accumulator")+" = "+naturalized_to_html("x_register");
    if (asm=="tya") return naturalized_to_html("accumulator")+" = "+naturalized_to_html("y_register");
    if (asm=="tax") return "x_register = "+naturalized_to_html("accumulator");
    if (asm=="tay") return "y_register = "+naturalized_to_html("accumulator");

    if (asm=="ldx") return naturalized_to_html("x_register")+" = "+operand;
    if (asm=="ldy") return naturalized_to_html("y_register")+" = "+operand;
    if (asm=="lda") return naturalized_to_html("accumulator")+" = "+operand;

    if (asm=="sta") return "memory_location("+operand+").setValue("+naturalized_to_html("accumulator")+")";
    if (asm=="stx") return "memory_location("+operand+").setValue(x_register)";

    if (asm=="inx") return naturalized_to_html("x_register")+"++";
    if (asm=="iny") return naturalized_to_html("y_register")+"++";
    if (asm=="dey") return naturalized_to_html("y_register")+"--";
    if (asm=="dex") return naturalized_to_html("x_register")+"--";

    if (asm=="dec") return "decrement_value_at_memory("+operand+")";
    if (asm=="inc") return "increment_value_at_memory("+operand+")";

    if (asm=="bne") return naturalized_to_html("if")+" Not_Equal then "+operand+"()";
    if (asm=="bcs") return naturalized_to_html("if")+" Carry_Set then "+operand+"()";

    if (asm=="jsr") return "call_function "+operand+"";
    if (asm=="sbc") return "Subtract with Carry "+operand+"";

    if (asm=="rts") return "return";
    if (asm=="rti") return "ReTurn from Interrupt";

    return ""+asm+" "+operand;
}