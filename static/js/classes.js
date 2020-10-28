
import CBNode from './final/CBNode.js'
import CBText from './final/CBText.js'
import cbCVSection from './final/cbCVSection.js'
import cbCapVal from './final/cbCapVal.js'
import CBInput from './final/CBInput.js'
// import cbType1 from './cbType1.js'
// import cbClass1 from './cbClass1.js'
import CBList from './final/CBList.js'
import CBContainers from './CBContainers.js'
import cbSection1 from './final/cbSection1.js'
import cbSection2 from './final/cbSection2.js'
import cbSection3 from './final/cbSection3.js'
// import check from './check.cb'
import CBLabel from './final/CBLabel.js'



const classes = {
    CBLabel,
    CBInput,
    cbCapVal,
    cbCVSection,
    cbSection1,
    cbSection2,
    cbSection3,
    CBContainers,
    CBNode,
    CBText,
    // cbType1,
    // cbClass1,
    CBList

};

export default function dynamicClass (name) {
    return classes[name];
  }
