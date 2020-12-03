
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
import CBCheckboxes from './final/CBCheckboxes.js'
import CBLabel from './final/CBLabel.js'



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
    CBCheckboxes
};

export default function dynamicClass (name) {
    return classes[name];
  }
