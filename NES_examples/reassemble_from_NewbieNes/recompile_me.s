.segment "HEADER"
        
        .byte   "NES", $1A      ; iNES header identifier
        .byte   2               ; 2x 16KB PRG code
        .byte   1               ; 1x  8KB CHR data
        .byte   $01, $00        ; mapper 0, vertical mirroring

;;;;;;;;;;;;;;;

;;; "nes" linker config requires a STARTUP section, even if it's empty
.segment "STARTUP"

.segment "CODE"

Function_8000:  
    sei     
    ldx #$ff    
    txs     
    lda #$00    
    sta $2000   
    sta $2001   
    lda #$3f    
    sta $2006   
    lda #$00    
    sta $2006   
    ldx #$00    
    ldy #$10

Function_801a:  
    lda $8051,x 
    sta $2007   
    inx     
    dey     
    bne Function_801a   
    lda #$21    
    sta $2006   
    lda #$c9    
    sta $2006   
    ldx #$00    
    ldy #$0d

Function_8032:  
    lda $8061,x 
    sta $2007   
    inx     
    dey     
    bne Function_8032   
    lda #$00    
    sta $2005   
    sta $2005   
    lda #$08    
    sta $2000   
    lda #$1e    
    sta $2001   
    jmp $804e