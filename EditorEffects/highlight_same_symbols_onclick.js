list_of_elements=["x","y","accumulator"];
prev_highlighted_element="x";

function setup_effects() {
  // called on succesful page load
  console.log("setup_effects_called!");

  

   for(var n=0; n<list_of_elements.length; n++){
        console.log(list_of_elements[n]);
        $(list_of_elements[n]).click(function() {
            tag=$(this)[0].tagName;
            $(prev_highlighted_element).css('background-color', 'rgba(183, 196, 183,0.0)');
            $(tag).css('background-color', '#B7C4B7');
            prev_highlighted_element=tag;
        });
    }

}