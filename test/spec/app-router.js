import { html } from 'hybrids';
import { AppRouter, AppRoute } from '../../src';
import { resolveRaf } from '../utils';

describe('app-router:', () => {
  const tree = test(html`
    <app-router>
      <app-route name="root" default></app-route>
      <app-route name="home" path="/home"></app-route>
      <app-route name="with-params" path="/params/:id"></app-route>
    </app-router>
  `.define({ AppRouter, AppRoute }));

  const baseTree = test(html`
    <app-router base="/base">
      <app-route name="root" default></app-route>
      <app-route name="home" path="/home"></app-route>
      <app-route name="with-params" path="/params/:id"></app-route>
    </app-router>
  `.define({ AppRouter, AppRoute }));

  const TestNestedRouter = {
    router: ({ shadowRoot }) => shadowRoot.querySelector('app-router'),
    render: () => html`
      <app-router base="/other-base">
        <app-route name="home" path="/home"></app-route>
        <app-route name="default" default></app-route>
      </app-router>
    `,
  };

  const nestedTree = test(html`
    <app-router>
      <app-route name="root" path="/"></app-route>
      <app-route name="other" path="/other"></app-route>

      <test-nested-router id="nested"></test-nested-router>
    </app-router>
  `.define({ AppRouter, AppRoute, TestNestedRouter }));

  it('throws for no matched route', () => {
    window.history.pushState(null, '', '/');

    const throwTreeEmpty = test(html`
      <app-router></app-router>
    `.define({ AppRouter }));
    const throwTreeNoDefault = test(html`
      <app-router>
        <app-route name="home" path="/home"></app-route>
      </app-router>
    `.define({ AppRouter, AppRoute }));

    expect(() => throwTreeEmpty(el => el.state)).toThrow();
    expect(() => throwTreeNoDefault(el => el.state)).toThrow();
  });

  describe('root router', () => {
    it('set zero deep', () => tree((el) => {
      expect(el.deep).toBe(0);
    }));

    it('initializes state with root route', () => {
      window.history.pushState(null, '', '/');

      tree((el) => {
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });
      });
    });

    it('initializes state with matched route', () => {
      window.history.pushState(null, '', '/home');

      tree((el) => {
        expect(el.state).toEqual({
          name: 'home',
          params: {},
        });
      });
    });

    it('initializes route with path parameters', () => {
      window.history.pushState(null, '', '/params/123');

      tree((el) => {
        expect(el.state).toEqual({
          name: 'with-params',
          params: {
            id: '123',
          },
        });
      });
    });

    it('initializes route with query parameters', () => {
      window.history.pushState(null, '', '/home?one=one&two=two');

      tree((el) => {
        expect(el.state).toEqual({
          name: 'home',
          params: {
            one: 'one',
            two: 'two',
          },
        });
      });
    });

    it('initializes matches root route with base', () => {
      window.history.pushState(null, '', '/base/');

      baseTree((el) => {
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });
      });
    });

    it('initializes matches home route with base', () => {
      window.history.pushState(null, '', '/base/home');

      baseTree((el) => {
        expect(el.state).toEqual({
          name: 'home',
          params: {},
        });
      });
    });
  });

  describe('nested router', () => {
    it('inherit base from parent state', (done) => {
      window.history.pushState(null, '', '/other/other-base/home');

      nestedTree(el => resolveRaf(() => {
        const { router } = el.querySelector('#nested');
        expect(router.base).toBe('/other-base');
        expect(router.resolvedBase).toBe('/other/other-base');
        done();
      }));
    });

    it('has next deep', done => nestedTree(el => resolveRaf(() => {
      const { router } = el.querySelector('#nested');
      expect(router.deep).toBe(1);
      done();
    })));

    it('initializes nested state', (done) => {
      window.history.pushState(null, '', '/');

      nestedTree(el => resolveRaf(() => {
        const { router } = el.querySelector('#nested');
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });

        expect(router.state).toEqual({
          name: 'default',
          params: {},
        });
        done();
      }));
    });
  });

  describe('"navigateTo" method', () => {
    beforeEach(() => { window.history.pushState(null, '', '/'); });

    it('push state', done => tree((el) => {
      el.navigateTo('home');

      return resolveRaf(() => {
        expect(el.index).toBe(1);
        expect(el.state).toEqual({
          name: 'home',
          params: {},
        });

        expect(window.location.pathname).toBe('/home');
        expect(window.location.search).toBe('');

        done();
      });
    }));

    it('push state with base', done => baseTree((el) => {
      el.navigateTo('home');

      return resolveRaf(() => {
        expect(el.index).toBe(1);
        expect(el.state).toEqual({
          name: 'home',
          params: {},
        });

        expect(window.location.pathname).toBe('/base/home');
        expect(window.location.search).toBe('');

        done();
      });
    }));

    it('replace state with params', done => tree((el) => {
      el.navigateTo('with-params', { id: '321', other: 'data' }, { replace: true });

      return resolveRaf(() => {
        expect(el.state).toEqual({
          name: 'with-params',
          params: {
            id: '321',
            other: 'data',
          },
        });

        expect(window.location.pathname).toBe('/params/321');
        expect(window.location.search).toBe('?other=data');

        done();
      });
    }));

    it('push state to route without path', done => tree((el) => {
      el.navigateTo('with-params', { id: '321', other: 'data' });
      el.navigateTo('root');

      return resolveRaf(() => {
        expect(el.index).toBe(2);
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });

        expect(window.location.pathname).toBe('/params/321');
        expect(window.location.search).toBe('?other=data');

        done();
      });
    }));

    it('push state to route without path with base', done => baseTree((el) => {
      el.navigateTo('with-params', { id: '321', other: 'data' });
      el.navigateTo('root');

      return resolveRaf(() => {
        expect(el.index).toBe(2);
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });

        expect(window.location.pathname).toEqual('/base/params/321');
        expect(window.location.search).toEqual('?other=data');

        done();
      });
    }));

    it('replace state for the same route', done => baseTree((el) => {
      el.navigateTo('root');

      return resolveRaf(() => {
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });

        done();
      });
    }));

    it('force push state to the same route', done => baseTree((el) => {
      const lastState = el.state;

      el.navigateTo('root', {}, { forcePush: true });

      return resolveRaf(() => {
        expect(el.state).not.toBe(lastState);
        expect(el.index).toBe(1);
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });

        done();
      });
    }));

    it('push state to nested route', done => nestedTree(el => resolveRaf(() => {
      const { router } = el.querySelector('#nested');
      router.navigateTo('home');

      return resolveRaf(() => {
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });
        expect(router.state).toEqual({
          name: 'home',
          params: {},
        });
        done();
      });
    })));

    it('replaces state to parent route', done => nestedTree(el => resolveRaf(() => {
      const { router } = el.querySelector('#nested');
      router.navigateTo('home');
      router.navigateTo('root');

      return resolveRaf(() => {
        expect(el.state).toEqual({
          name: 'root',
          params: {},
        });
        expect(router.state).toEqual({
          name: 'default',
          params: {},
        });
        done();
      });
    })));

    it('push state to other parent route', done => nestedTree(el => resolveRaf(() => {
      const { router } = el.querySelector('#nested');
      router.navigateTo('home');
      router.navigateTo('other');

      return resolveRaf(() => {
        expect(el.index).toBe(2);
        expect(el.state).toEqual({
          name: 'other',
          params: {},
        });
        expect(router.state).toEqual({
          name: 'home',
          params: {},
        });
        done();
      });
    })));

    it('returns false for no matched route', () => tree((el) => {
      expect(el.navigateTo('some-other-name')).toBe(false);
    }));

    it('returns true for matched route', () => tree((el) => {
      expect(el.navigateTo('home')).toBe(true);
    }));
  });

  describe('getURL method', () => {
    describe('for root router', () => {
      it('returns URL for own route', () => tree((el) => {
        expect(el.getURL('home')).toEqual('/home');
      }));

      it('returns URL for own route with path params', () => tree((el) => {
        expect(el.getURL('with-params', { id: 1 })).toEqual('/params/1');
      }));

      it('returns URL for own route with omitted query params', () => tree((el) => {
        expect(el.getURL('with-params', { id: 1, other: 'test' }, true)).toEqual('/params/1');
      }));

      it('returns URL for own route with omitted query params', () => tree((el) => {
        expect(el.getURL('with-params', { id: 1, other: 'test' })).toEqual('/params/1?other=test');
      }));

      it('returns empty string for not found route', () => tree((el) => {
        expect(el.getURL('not-existing')).toEqual('');
      }));
    });

    describe('for nested router', () => {
      beforeEach(() => window.history.pushState(null, '', '/other/other-base/home'));

      it('returns URL for own route', done => nestedTree(el => resolveRaf(() => {
        const { router } = el.querySelector('#nested');
        expect(router.getURL('home')).toEqual('/other/other-base/home');
        done();
      })));

      it('returns URL for parent route', done => nestedTree(el => resolveRaf(() => {
        const { router } = el.querySelector('#nested');
        expect(router.getURL('root')).toEqual('/');
        done();
      })));

      it('returns empty string for not found route', done => nestedTree(el => resolveRaf(() => {
        const { router } = el.querySelector('#nested');
        expect(router.getURL('not-existing')).toEqual('');
        done();
      })));
    });
  });

  // EVENTS

  describe('popstate event -', () => {
    it('updates state after window back navigation', (done) => {
      window.history.pushState(null, '', '/');

      tree((el) => {
        el.navigateTo('home');

        expect(el.index).toBe(1);
        expect(el.state).toEqual({
          name: 'home',
          params: {},
        });

        window.history.back();

        return resolveRaf(() => {
          expect(el.index).toBe(0);
          expect(el.state).toEqual({
            name: 'root',
            params: {},
          });
          done();
        });
      });
    });
  });
});
