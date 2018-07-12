import { html } from 'hybrids';
import { AppSwitch } from '../../src';
import { resolveRaf } from '../utils';

describe('app-switch:', () => {
  const TestSwitchView = {
    state: null,
  };

  const tree = test(html`
    <app-switch>
      <app-route name="root" path="/" component="test-switch-view"></app-route>
      <app-route name="home" path="/home" component="test-switch-view"></app-route>
      <app-route name="other" path="/other" component="test-switch-view"></app-route>
    </app-switch>
  `.define({ AppSwitch, TestSwitchView }));

  beforeEach(() => window.history.pushState(null, '', '/'));

  it('renders root route', (done) => {
    tree(el => resolveRaf(() => {
      expect(el.shadowRoot.querySelector('test-switch-view').state.name).toBe('root');
      done();
    }));
  });

  it('switch routes', done => tree(el => resolveRaf(() => {
    el.navigateTo('home');
    return resolveRaf(() => {
      el.navigateTo('other');
      return resolveRaf(() => {
        expect(el.shadowRoot.querySelectorAll('test-switch-view').length).toBe(3);
        expect(el.shadowRoot.querySelectorAll('test-switch-view[hidden]').length).toBe(2);
        expect(el.shadowRoot.querySelector('test-switch-view:not([hidden])').state.name).toBe('other');
        done();
      });
    });
  })));

  it('removes old route for unmount set before navigate', done => tree((el) => {
    el.unmount = true;
    return resolveRaf(() => {
      el.navigateTo('home');

      return resolveRaf(() => {
        expect(el.shadowRoot.querySelectorAll('test-switch-view').length).toBe(1);
        expect(el.shadowRoot.querySelector('test-switch-view[hidden]')).toBe(null);
        expect(el.shadowRoot.querySelector('test-switch-view:not([hidden])').state.name).toBe('home');
        done();
      });
    });
  }));

  it('removes old route for unmount set after navigate', done => tree((el) => {
    el.navigateTo('home');
    el.unmount = true;
    return resolveRaf(() => resolveRaf(() => {
      expect(el.shadowRoot.querySelectorAll('test-switch-view').length).toBe(1);
      expect(el.shadowRoot.querySelector('test-switch-view[hidden]')).toBe(null);
      expect(el.shadowRoot.querySelector('test-switch-view:not([hidden])').state.name).toBe('home');
      done();
    }));
  }));
});
