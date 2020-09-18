import dynamicClass  from './classes.js';
import CBList from './cbList.js'
import CBText from './CBText.js'
class CBNode {
    constructor(data) {
        this.data = data
    }
    Render (div, CBTree) {

        if (CBTree.CB == "CBNode") {
            var keys = Object.keys(CBTree.Children)
            keys.forEach((key)=>{

                this.Render(div, CBTree.Children[key])
            })
        } else {
            // console.log("CBNOde mai hu ", CBTree.CB)
            var obj = dynamicClass(CBTree.CB)
            obj = new obj(this.data)
            var path = CBTree.Path
                var data = obj.Render(path, this.data)
                $(`#${div}`).append(data)
            // if (CBTree.CB == "CBList") {
            //     var obj = new cbList(this.data)
            //     var path = CBTree.Path
            //     var data = obj.Render(path, this.data)
            //     $(`#${div}`).append(data)
            // } else {
            // var obj = new CBText()
            // var path = CBTree.Path
            // var data = obj.Render(path, this.data)
            // $(`#${div}`).append(data)
            // }
            
        }
}
}
export default CBNode