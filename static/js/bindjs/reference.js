class Reference {}

export const useReference = (defaultValue, _defaultFallBack) => {
  const modifier = typeof defaultValue === "function" ? defaultValue : (v) => v;  
  let value = modifier(_defaultFallBack ?? defaultValue);  
  const triggers = new Set();

  const fn = function (newValue) {    
    if (arguments.length === 0) {
      return value;
    }
    if (typeof newValue === "function") {
      value = modifier(newValue(value));
    } else {      
      value = modifier(newValue);
    }

    for (const trigger of triggers) {
      trigger(value);
    }

    return this;
  };
  //for debugging
  fn.VarName = name;
  //
  fn.addTrigger = (trigger) => {
    triggers.add(trigger);
    trigger(value);
  };

  Object.setPrototypeOf(fn, Reference.prototype);
  return fn;
};

export const isReference = (value) => value instanceof Reference;
