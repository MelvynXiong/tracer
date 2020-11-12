import { RESERVED_PROPS } from 'shared/props';

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
  if (typeof element === 'string') {
    const textNode = document.createTextNode(element);
    return container.appendChild(textNode);
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

  return container.appendChild(dom); // 挂载 DOM
}

const ReactDOM = {
  render: (element: any, container: any) => {
    container.innerHTML = ''; // 多次调用前，清楚目标 DOM 内容
    return render(element, container);
  },
};

export default ReactDOM;
