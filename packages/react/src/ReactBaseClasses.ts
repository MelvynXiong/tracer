import { renderComponent } from '../../react-dom/src/client/ReactDOM';

class Component<P, S> {
  state: S;
  props: P;
  context: any;
  refs: any;
  forceUpdate: any;

  constructor(props: P) {
    this.state = {} as S;
    this.props = props;
    this.context = '';
    this.refs = '';
  }

  render() {
    return;
  }

  setState(newState: any) {
    Object.assign(this.state, newState);
    // 状态更新后，重新渲染组件
    renderComponent(this);
  }
}

export { Component };
