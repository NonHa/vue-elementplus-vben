import type { App } from 'vue';
import { Button } from './Button';
import { ElInput } from 'element-plus';

export function registerGlobComp(app: App) {
  app.use(ElInput).use(Button);
}
