import { RESERVED_PROPS } from 'shared/props.ts';
interface IProps {
  children: object | Array<any>;
  [propName: string]: any;
}

const ReactElement = function (type: string, key: string, props: IProps) {
  const element = {
    type,
    key,
    props,
  };
  return element;
};

export function createElement(type: string, config: any, ...children: any[]) {
  let propName;
  const props: IProps = {} as IProps;
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

  props.children = children;

  return ReactElement(type, key, props);
}
