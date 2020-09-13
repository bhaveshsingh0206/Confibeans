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
            if (CBTree.CB == "CBList") {
                var obj = new cbList(this.data)
                var path = CBTree.Path
                var data = obj.Render(path, this.data)
                $(`#${div}`).append(data)
            } else {
            var obj = new CBText()
            var path = CBTree.Path
            var data = obj.Render(path, this.data)
            $(`#${div}`).append(data)
            }
            
        }
}
}