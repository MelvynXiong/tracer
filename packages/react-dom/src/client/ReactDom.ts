import { Component } from '../../../react/src/ReactBaseClasses';
import { RESERVED_PROPS } from 'shared/props';

function createComponent(component: any, props: any) {
  let instance;
  // 类定义组件，直接返回实例
  if (component.prototype && component.prototype.render) {
    instance = new component(props);
  } else {
    // 函数定义组件扩展为类定义组件
    instance = new Component(props);
    instance.constructor = component;
    instance.render = function () {
      return this.constructor(props);
    };
  }
  return instance;
}

// set props
function setComponentProps(component: any, props: any) {
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;

  renderComponent(component);
}

export const renderComponent = function (component: any) {
  let base;

  const renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = _render(renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    component.componentDidMount();
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }

  component.base = base;
  base._component = component;
};

function setAttribute(dom: any, key: string, val: any) {
  let attr;
  if (key === 'className') {
    attr = 'class';
  }

  if (key === 'style') {
    if (!val || typeof val === 'string') {
      dom.style.cssText = val || '';
    } else if (typeof val === 'object') {
      for (let name in val) {
        dom.style[name] =
          typeof val[name] === 'number' ? val[name] + 'px' : val[name];
      }
    }
  } else if (/^on\w+/.test(key)) {
    // 监听方法透传
    attr = key.toLowerCase();
    dom[attr] = val || '';
  } else {
    if (val) {
      dom.setAttribute(attr, val);
    } else {
      dom.removeAttribute(attr);
    }
  }
}

function render(element: any, container: HTMLElement) {
  return container.appendChild(_render(element));
}

function _render(element: any) {
  let textNode;
  if (
    element === undefined ||
    element === null ||
    typeof element === 'boolean'
  ) {
    textNode = '';
  }

  if (typeof element === 'number' || typeof element === 'string') {
    textNode = document.createTextNode(`${element}`);
    return textNode;
  }

  if (typeof element.type === 'function') {
    const component = createComponent(element.type, element.props);

    setComponentProps(component, element.props);

    // 返回 DOM 元素
    return component.base;
  }

  const dom = document.createElement(element.type);
  const { props } = element;
  Object.keys(props).forEach((propsName) => {
    const val = props[propsName];
    if (!Object.keys(RESERVED_PROPS).includes(propsName)) {
      setAttribute(dom, propsName, val); // 设置属性
    }
  });

  props.children.forEach((child: any) => render(child, dom));

  return dom;
}

const ReactDOM = {
  render: (element: any, container: any) => {
    container.innerHTML = ''; // 多次调用前，清除目标 DOM 内容
    return render(element, container);
  },
};

export default ReactDOM;
