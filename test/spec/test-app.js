import { define, html } from 'hybrids';
import {
  AppLayout, AppRoute, AppSwitch, AppStack, AppRouter,
} from '../../src';

fit('test-app', () => {
  const UiLink = {
    router: AppRouter.parentRouter,
    replace: false,
    params: {},
    linkTo: '',
    render: ({
      router, linkTo, replace, params,
    }) => html`
      ${AppLayout.style()}
      <a 
        href="${router.getURL(linkTo, params)}"
        onclick="${(host, event) => {
    event.preventDefault();
    router.navigateTo(linkTo, params, { replace });
  }}"
      >
        <slot></slot>
      </a>
    `,
  };

  const HomeView = {
    state: null,
    render: ({ state: { params } }) => html`
      ${AppLayout.style()}
      <div>This is home view: ${params.id}.</div>
      <input type="text" />
      <app-layout>
        <ui-link link-to="root">Link to root</ui-link>
        <ui-link link-to="home" params="${{ id: 1 }}">Link to home</ui-link>
      </app-layout>
    `,
  };

  const RootView = {
    state: null,
    render: () => html`
      ${AppLayout.style()}
      <p>
        <ui-link link-to="home">Link to home</ui-link>
        <input type="text" />
      </p>
    `.define({
    HomeView, AppSwitch, AppLayout, UiLink,
  }),
  };

  const TestApp = define('test-app', {
    render: () => html`
      <app-stack>
        <app-route name="root" path="/" component="root-view" default></app-route>
        <app-route name="home" path="/home" component="home-view"></app-route>
      </app-stack>
    `.define({
        AppStack, AppRoute, RootView, HomeView,
      }),
  });

  document.body.appendChild(new TestApp());
});
