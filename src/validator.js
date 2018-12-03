import * as Constant from './constant';
import * as ErrorMsg from './errorMessage';

const validator = {
    name: {
      rules: [
        {
          test: Constant.NAME_VALID_REGEX,
          message: ErrorMsg.NAME_INVALID_REGEX,
        },
        {
          test: (value) => {
              if(value.length >= Constant.NAME_MIN_LENGTH)
            return value.length >= Constant.NAME_MIN_LENGTH;
          },
          message: ErrorMsg.NAME_MIN_LENGTH_ERROR + Constant.NAME_MIN_LENGTH +' characters',
        },
        {
            test: (value) => {
                if(value.length < Constant.NAME_MAX_LENGTH)
              return value.length < Constant.NAME_MAX_LENGTH;
            },
            message: ErrorMsg.NAME_MAX_LENGTH_ERROR+ Constant.NAME_MAX_LENGTH +' characters',
          }
      ],
      errors: [],
      valid: true,
      state: '',
      required:false
    },
    gender:{
      errors: [],
      valid: true,
      state: '',
      required:true
    },
    country:{
      errors: [],
      valid: true,
      state: '',
      required:true
    },
    language:{
      errors: [],
      valid: true,
      state: [],
      required:false
    }
  };
  export default validator;