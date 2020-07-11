import * as memoizee_lib from "memoizee";

const memoizee = () => {
  return (_, __, descriptor) => {
    const oldFunction = descriptor.value;
    const newFunction = memoizee_lib(oldFunction);
    descriptor.value = function () {
      return newFunction.apply(this, arguments);
    };
  };
};

export default memoizee;
