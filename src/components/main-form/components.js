let Components = {};
let formItem =null;
const mainPath = '../../pages';

for (let i = 0; i < formList.length; i++) {
    formItem = mainPath+formList[i].url+formList[i].url;
    Components[formList.url] = require(formItem).default;
}
// Components['Component2'] = require('./Component2').default;
// Components['Component3'] = require('./Component3').default;

export default Components
