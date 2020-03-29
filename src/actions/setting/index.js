import { DO_SAVE_SETTING } from '../../symbols/setting.js';

export const doSaveSetting = payload => dispatch => {
  dispatch({
    type: DO_SAVE_SETTING,
    payload
  });
};
