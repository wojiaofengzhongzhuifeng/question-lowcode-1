import { material, project } from '@alilc/lowcode-engine';
import { filterPackages } from '@alilc/lowcode-plugin-inject'
import { Message, Dialog } from '@alifd/next';
import { IPublicTypeProjectSchema, IPublicEnumTransformStage } from '@alilc/lowcode-types';
import DefaultPageSchema from './defaultPageSchema.json';
import DefaultI18nSchema from './defaultI18nSchema.json';




const generateProjectSchema = (pageSchema: any, i18nSchema: any): IPublicTypeProjectSchema => {
  return {
    componentsTree: [pageSchema],
    componentsMap: material.componentsMap as any,
    version: '1.0.0',
    i18n: i18nSchema,
  };
}


export const saveSchema = async (scenarioName: string = 'unknown') => {
  let result = JSON.stringify(project.exportSchema(IPublicEnumTransformStage.Save))

  // todo 接入服务端接口
  console.log(result);
  // window.location.href = "fjdkslajfdklsa"

  const currentUrl = window.location.href;

  const updatedUrl = `${currentUrl}?schemaid=123321`;  // todo 123321 需要修改

  window.history.pushState({ path: updatedUrl }, '', updatedUrl);


  // setProjectSchemaToLocalStorage(scenarioName);
  // await setPackagesToLocalStorage(scenarioName);
  // Message.success('成功保存到本地');
};

export const resetSchema = async (scenarioName: string = 'unknown') => {
  try {
    await new Promise<void>((resolve, reject) => {
      Dialog.confirm({
        content: '确定要重置吗？您所有的修改都将消失！',
        onOk: () => {
          resolve();
        },
        onCancel: () => {
          reject()
        },
      })
    })
  } catch(err) {
    return;
  }
  const defaultSchema = generateProjectSchema(DefaultPageSchema, DefaultI18nSchema);

  project.importSchema(defaultSchema as any);
  project.simulatorHost?.rerender();

  setProjectSchemaToLocalStorage(scenarioName);
  await setPackagesToLocalStorage(scenarioName);
  Message.success('成功重置页面');
}

const getLSName = (scenarioName: string, ns: string = 'projectSchema') => `${scenarioName}:${ns}`;

export const getProjectSchemaFromLocalStorage = (scenarioName: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const schemaid = searchParams.get('schemaid')

  console.log('schemaid', schemaid);

  if(!schemaid){
    if (!scenarioName) {
      console.error('scenarioName is required!');
      return;
    }
    const localValue = window.localStorage.getItem(getLSName(scenarioName));
    if (localValue) {
      return JSON.parse(localValue);
    }
    return undefined;
  } else {
    // todo 接入接口
    let mockSchemaData = {"version":"1.0.0","componentsMap":[{"package":"@alifd/layout","version":"2.0.7","exportName":"Cell","main":"lib/index.js","destructuring":true,"subName":"","componentName":"FDCell"},{"package":"@alifd/layout","version":"2.0.7","exportName":"Block","main":"lib/index.js","destructuring":true,"subName":"","componentName":"FDBlock"},{"package":"@alifd/layout","version":"2.0.7","exportName":"Section","main":"lib/index.js","destructuring":true,"subName":"","componentName":"FDSection"},{"package":"@alifd/layout","version":"2.0.7","exportName":"Page","main":"lib/index.js","destructuring":true,"componentName":"FDPage"},{"devMode":"lowCode","componentName":"Page"},{"package":"gate-lowcode-component","version":"0.1.9","exportName":"FAQS","main":"src/index.tsx","destructuring":true,"subName":"","componentName":"FAQS"}],"componentsTree":[{"componentName":"Page","id":"node_dockcviv8fo1","props":{"ref":"outerView","style":{"height":"100%"}},"docId":"doclaqkk3b9","fileName":"/","dataSource":{"list":[{"type":"fetch","isInit":true,"options":{"params":{},"method":"GET","isCors":true,"timeout":5000,"headers":{},"uri":"mock/info.json"},"id":"info","shouldFetch":{"type":"JSFunction","value":"function() { \n  console.log('should fetch.....');\n  return true; \n}"}}]},"state":{"text":{"type":"JSExpression","value":"\"outer\""},"isShowDialog":{"type":"JSExpression","value":"false"}},"css":"body {\n  font-size: 12px;\n}\n\n.button {\n  width: 100px;\n  color: #ff00ff\n}","lifeCycles":{"componentDidMount":{"type":"JSFunction","value":"function componentDidMount() {\n  console.log('did mount');\n}"},"componentWillUnmount":{"type":"JSFunction","value":"function componentWillUnmount() {\n  console.log('will unmount');\n}"}},"methods":{"testFunc":{"type":"JSFunction","value":"function testFunc() {\n  console.log('test func');\n}"},"onClick":{"type":"JSFunction","value":"function onClick() {\n  this.setState({\n  isShowDialog: true\n  });\n}"},"closeDialog":{"type":"JSFunction","value":"function closeDialog() {\n  this.setState({\n  isShowDialog: false\n  });\n}"},"getHelloWorldText":{"type":"JSFunction","value":"function getHelloWorldText() {\n  return this.i18n('i18n-jwg27yo4');\n}"},"getHelloWorldText2":{"type":"JSFunction","value":"function getHelloWorldText2() {\n  return this.i18n('i18n-jwg27yo3', {\n  name: '絮黎'\n  });\n}"},"onTestConstantsButtonClicked":{"type":"JSFunction","value":"function onTestConstantsButtonClicked() {\n  console.log('constants.ConstantA:', this.constants.ConstantA);\n  console.log('constants.ConstantB:', this.constants.ConstantB);\n}"},"onTestUtilsButtonClicked":{"type":"JSFunction","value":"function onTestUtilsButtonClicked() {\n  this.utils.demoUtil('param1', 'param2');\n}"}},"originCode":"class LowcodeComponent extends Component {\n  state = {\n    \"text\": \"outer\",\n    \"isShowDialog\": false\n  }\n  componentDidMount() {\n    console.log('did mount');\n  }\n  componentWillUnmount() {\n    console.log('will unmount');\n  }\n  testFunc() {\n    console.log('test func');\n  }\n  onClick() {\n    this.setState({\n      isShowDialog: true\n    });\n  }\n  closeDialog() {\n    this.setState({\n      isShowDialog: false\n    });\n  }\n  getHelloWorldText() {\n    return this.i18n('i18n-jwg27yo4');\n  }\n  getHelloWorldText2() {\n    return this.i18n('i18n-jwg27yo3', {\n      name: '絮黎',\n    });\n  }\n  onTestConstantsButtonClicked() {\n    console.log('constants.ConstantA:', this.constants.ConstantA);\n    console.log('constants.ConstantB:', this.constants.ConstantB);\n\t}\n\tonTestUtilsButtonClicked(){\n    this.utils.demoUtil('param1', 'param2');\n\t}\n}","hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"FAQS","id":"node_oclhep3sa08a","props":{"title":"faq title 123","FaqList":[{"title":"Is GBTC a good investment, especially when it is trading at a discount to NAV?","contentList":["GBTC shares do allow investors to have exposure to Bitcoin while bypassing certain challenges such as storage, security and insurance, as well as legal compliance in the case of US investors. However, steep discount to NAV also meant that GBTC shareholders are likely to be in the state of panic or fear. With recent attacks towards the Grayscale management, such added variable to the already volatile Bitcoin price movement may increase the risk for new investors to Bitcoin and cryptocurrencies.","other GBTC shares do allow investors to have exposure to Bitcoin while bypassing certain challenges such as storage, security and insurance, as well as legal compliance in the case of US investors. However, steep discount to NAV also meant that GBTC shareholders are likely to be in the state of panic or fear. With recent attacks towards the Grayscale management, such added variable to the already volatile Bitcoin price movement may increase the risk for new investors to Bitcoin and cryptocurrencies."],"isShow":true},{"title":"How to choose between GBTC and spot Bitcoin?","contentList":["As all GBTC does is holding Bitcoin via trust on behalf of the investors, GBTC can actually be considered a <a href=\"/learn/articles/how-to-choose-derivatives-that-suit-you/26\">derivative</a> of Bitcoin. In saying so, the value of GBTC shares is derived from the NAV of the Bitcoins held, and comes without any intrinsic value of its own. GBTC shares are therefore vulnerable to market sentiment and risks, and is very much prone to supply and demand factors on top of spot Bitcoin price. This can pose more difficulties to investors as far as share valuation is concerned."],"isShow":false},{"title":"How to buy Bitcoin if it is decided that spot Bitcoin would be more appropriate?","contentList":["You can buy Bitcoin by trading on the spot market via Gate.io, all you have to do is follow the steps on <a href=\"/how-to-buy/bitcoin-btc\">how to buy BTC</a> once you have funded your account."],"isShow":false},{"title":"What is the price prediction of Bitcoin (BTC) in the future?","contentList":["Investors tend to rely on <a href=\"learn/articles/what-is-fundamental-wnalysis/27\">fundamental analysis</a> and <a href=\"/learn/articles/what-is-technical-analysis/25\">technical analysis</a> in trying to predict the future price of Bitcoin. On this point, the <a href=\"/price-prediction/bitcoin-btc\">BTC price prediction</a> may be helpful in your decision making process before making any investment decisions."],"isShow":false}],"isDark":false,"id":""},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"FDPage","id":"node_oclfjpfqjy5","props":{"contentProps":{"style":{"background":"rgba(255,255,255,0)"}},"ref":"fdpage-bb43fbb0"},"title":"页面","hidden":false,"isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"FDSection","id":"node_oclfjpfqjy6","props":{"style":{"backgroundColor":"rgba(255,255,255,1)","minHeight":""}},"title":"区域","hidden":false,"isLocked":false,"condition":true,"conditionGroup":""}]}]}],"i18n":{"zh-CN":{"i18n-jwg27yo4":"你好 ","i18n-jwg27yo3":"{name} 博士"},"en-US":{"i18n-jwg27yo4":"Hello ","i18n-jwg27yo3":"Doctor {name}"}}}
    return mockSchemaData
  }



}

const setProjectSchemaToLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  window.localStorage.setItem(
    getLSName(scenarioName),
    JSON.stringify(project.exportSchema(IPublicEnumTransformStage.Save))
  );
}

const setPackagesToLocalStorage = async (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  const packages = await filterPackages(material.getAssets().packages);
  window.localStorage.setItem(
    getLSName(scenarioName, 'packages'),
    JSON.stringify(packages),
  );
}

export const getPackagesFromLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  return JSON.parse(window.localStorage.getItem(getLSName(scenarioName, 'packages')) || '{}');
}

export const getProjectSchema = async (scenarioName: string = 'unknown') : Promise<IPublicTypeProjectSchema> => {
  const pageSchema = await getPageSchema(scenarioName);
  return generateProjectSchema(pageSchema, DefaultI18nSchema);
};

export const getPageSchema = async (scenarioName: string = 'unknown') => {
  const pageSchema = getProjectSchemaFromLocalStorage(scenarioName)?.componentsTree?.[0];
  if (pageSchema) {
    return pageSchema;
  }

  return DefaultPageSchema;
};

export const getPreviewLocale = (scenarioName: string) => {
  const key = getLSName(scenarioName, 'previewLocale');
  return window.localStorage.getItem(key) || 'zh-CN';
}

export const setPreviewLocale = (scenarioName: string, locale: string) => {
  const key = getLSName(scenarioName, 'previewLocale');
  window.localStorage.setItem(key, locale || 'zh-CN');
  window.location.reload();
}
