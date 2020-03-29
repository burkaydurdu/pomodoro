import { DO_SAVE_SETTING } from '../../symbols/setting.js';

export default (
  state = {},
  action,
) => {
  switch (action.type) {
    case DO_SAVE_SETTING:
      return {
        ...state,
        setting: action.payload,
      };
    default:
      return state;
  }
}
