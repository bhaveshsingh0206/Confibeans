export default class CBCheckBoxes {
    constructor(){
        this.styles = "spaced"
        
    }
    getValue(path) {
        console.log("Path ",path)
        var leaf = document.getElementsByClassName(path);
        var checkedValue = []; 
// var inputElements = document.getElementsByClassName('messageCheckbox');
    for(var i=0; leaf[i]; ++i){
      if(leaf[i].checked){
           checkedValue.push(leaf[i].value);
      }
      if (i==leaf.length-1) {
        console.log("Check ",checkedValue)
        
        return checkedValue;
      }
    }
    
    }
}