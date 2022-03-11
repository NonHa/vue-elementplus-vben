/*
 * @Author: your name
 * @Date: 2021-12-25 15:07:42
 * @LastEditTime: 2022-03-04 14:36:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-vben-admin\src\utils\factory\createAsyncComponent.tsx
 */
import {
  defineAsyncComponent,
  // FunctionalComponent, CSSProperties
} from 'vue';
import { noop } from '/@/utils';
import { showLoading } from '/@/utils/loading';

// const Loading: FunctionalComponent<{ size: 'small' | 'default' | 'large' }> = (props) => {
//   const style: CSSProperties = {
//     position: 'absolute',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   };
//   return (
//     <div style={style}>
//       <Spin spinning={true} size={props.size} />
//     </div>
//   );
// };

interface Options {
  delay?: number;
  timeout?: number;
  loading?: boolean;
  retry?: boolean;
  hideTime?: number;
}

export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { delay = 100, timeout = 30000, loading = false, retry = true, hideTime = 500 } = options;
  console.log('hideTime', hideTime);

  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? (
      <span>
        {showLoading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
          hideTime,
        })}
      </span>
    ) : undefined,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    // TODO
    timeout,
    // errorComponent
    // Defining if component is suspensible. Default: true.
    // suspensible: false,
    delay,
    /**
     *
     * @param {*} error Error message object
     * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
     * @param {*} fail  End of failure
     * @param {*} attempts Maximum allowed retries number
     */
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            // retry on fetch errors, 3 max attempts
            retry();
          } else {
            // Note that retry/fail are like resolve/reject of a promise:
            // one of them must be called for the error handling to continue.
            fail();
          }
        },
  });
}
