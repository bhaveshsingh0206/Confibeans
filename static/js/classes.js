import cbSection1 from './cbSection1.js'
import CBNode from './CBNode.js'
import CBText from './CBText.js'
import cbType1 from './cbType1.js'
import cbClass1 from './cbClass1.js'
import CBList from './cbList.js'
import CBContainer from './CBContainer.js'
import abc from './prac.js'



const classes = {
    abc,
    cbSection1,
    CBNode,
    CBText,
    cbType1,
    cbClass1,
    CBList,
    CBContainer
};

export default function dynamicClass (name) {
    return classes[name];
  }
