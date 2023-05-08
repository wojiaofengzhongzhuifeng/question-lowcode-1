import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';
import {
  saveSchema,
  resetSchema,
} from '../../services/mockService';

// 保存功能示例
const SaveSchemaToBackEndPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config } = ctx;
      const scenarioName = config.get('scenarioName');

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => saveSchema(scenarioName)}>
            保存到线上
          </Button>
        ),
      });
      // skeleton.add({
      //   name: 'resetSchema',
      //   area: 'topArea',
      //   type: 'Widget',
      //   props: {
      //     align: 'right',
      //   },
      //   content: (
      //     <Button onClick={() => resetSchema(scenarioName)}>
      //       重置页面
      //     </Button>
      //   ),
      // });
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        saveSchema(scenarioName);
      });
    },
  };
}
SaveSchemaToBackEndPlugin.pluginName = 'SaveSchemaToBackEndPlugin';
// SaveSchemaToBackEndPlugin.meta = {
//   dependencies: ['EditorInitPlugin'],
// };
export default SaveSchemaToBackEndPlugin;
