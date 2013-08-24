$(function(){
  $(document).bind("mousedown", function(_event){
    console.log("down: " + _event.clientX);
    console.log("down: " + _event.clientY);

    $(document).bind("mousemove.onDrag", function(_event){
//      console.log("move: " + _event.clientX);
//      console.log("move: " + _event.clientY);
    });
  });
  $(document).bind("mouseup", function(_event){
    console.log(" up : " + _event.clientX);
    console.log(" up : " + _event.clientY);

    $(document).unbind("mousemove.onDrag");
  });

  $(".draggable").draggable({
    // axis: 'y',
    // containment: "parent", // draggable element will not move out from assigned element
    cursor: "crosshair", // assign cursor type
    cursorAt: { left: 0, top: 0 }, // mouse cursor point assined position by pixel
    distance: 10, // threshold to start dragging by pixel
    // grid: [100, 20], // drag each [x, y] pixels like grid snapshot
    opacity: 0.5, // transparentize dragging element by rate
    // revert: true, // revert position of element after dragging
    scroll: true, // auto scroll while dragging
    snap: ".frame_box", // snap to assinged selector or true( for .ui-draggable )
    // snapTolerance: 50, // default 20 by pixels, declare snappable distance
    stack: ".draggable", // z-index management to assined selector, if self, stack each dragging

    create: function(_event, ui){
      // invoke when assigned
      console.log("on create"); console.log(_event); console.log(ui);
    },
    start: function(_event, ui){
      // invoke when dragging stat
      console.log("on start"); console.log(_event); console.log(ui);
    },
    drag: function(_event, ui){
      // invoke while dragging
      // console.log("on drag"); console.log(_event); console.log(ui);
    },
    stop: function(_event, ui){
      // invoke when dragging finished
      console.log("on stop"); console.log(_event); console.log(ui);
    },
  });
});
