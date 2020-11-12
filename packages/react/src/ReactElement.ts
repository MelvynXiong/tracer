const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

const ReactElement = function (type: string, key: string, props: object) {
  const element = {
    type,
    key,
    props,
  };
  return element;
};

export function createElement(type: any, config: any, children: any) {
  let propName;
  const props = {} as any;
  let key = null;

  if (config !== null) {
    key = config.key === undefined ? null : config.key;

    for (propName in config) {
      if (
        config.hasOwnProperty(propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = new Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(type, key, props);
}
