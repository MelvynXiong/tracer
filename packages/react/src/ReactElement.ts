// import { Component } from './ReactBaseClasses';
import { RESERVED_PROPS } from 'shared/props';
interface IProps {
  children: object | Array<any>;
  [propName: string]: any;
}

const ReactElement = function (type: any, key: string, props: IProps) {
  const element = {
    type,
    key,
    props,
  };
  return element;
};

/**
 *
 * @param type 当JSX片段中的某个元素是组件时，type将会是个方法，而不是字符串
 * @param config
 * @param children
 */
export function createElement(type: any, config: any, ...children: any[]) {
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
