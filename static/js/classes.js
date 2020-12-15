
import CBNode from './final/CBNode.js'
import CBText from './final/CBText.js'
import cbCVSection from './final/cbCVSection.js'
import cbCapVal from './final/cbCapVal.js'
import CBInput from './final/CBInput.js'
import CBDate from './final/CBDate.js'
import CBRadio from './final/CBRadio.js'
import CBRadioButtons from './final/CBRadioButtons.js'

import CBList from './final/CBList.js'
import CBContainers from './CBContainers.js'
import cbSection1 from './final/cbSection1.js'
import cbSection2 from './final/cbSection2.js'
import cbSection3 from './final/cbSection3.js'
import CBDropdown from './final/CBDropdown.js'
import CBDropdowns from './final/CBDropdowns.js'
import CBCheckbox from './final/CBCheckbox.js'
import CBCheckBoxes from './final/CBCheckBoxes.js'
import CBLabel from './final/CBLabel.js'
import CBPanel from './final/CBPanel.js'
import CBPanels from './final/CBPanels.js'
import CBPanelTitle from './final/CBPanelTitle.js'


const classes = {
    CBRadioButtons,
    CBRadio,
    CBDate,
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
    CBList,
    CBDropdown,
    CBDropdowns,
    CBCheckbox,
    CBCheckBoxes,
    CBPanel,
    CBPanels,
    CBPanelTitle
};

export default function dynamicClass (name) {
    return classes[name];
  }





//   "selectGender":{
//     "Aitle": "Select your Gender",
//     "Value": ["Male"],
//     "cbd": {
//         "CBClass":"CBRadioButtons",
//         "LoV": ["Male", "Female", "Other"]
//     }
// },
// "yropdownData1":{
//     "Aitle": "Select Country",
//     "Value": ["Australia"],
//     "cbd": {
//         "CBClass":"CBDropdown",
//         "LoV": ["India", "Australia", "England"]
//     }
// },
// "zheckboxData1":{
//     "Aitle": "Select Choices",
//     "Value": ["India","England"], 
//     "cbd": {
//         "CBClass":"CBCheckbox",
//         "LoV": ["India", "Australia", "England"]
//     }
// }