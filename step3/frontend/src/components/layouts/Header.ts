import {Component} from "@/_core";
import {authStore, SIGN_OUT} from "@/store";
import {router, RouterLink} from "@/router";

export class Header extends Component {
  protected template(): string {
    return `      
      <a href="/" class="text-black" data-component="RouterLink">
        <h1 class="text-center font-bold">π μ§νμ²  λΈμ λ</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
        ${authStore.$state.authentication ? `
          <a href="/stations" class="my-1" data-component="RouterLink">
            <button class="btn bg-white shadow mx-1">π μ­ κ΄λ¦¬</button>
          </a>
          <a href="/lines" class="my-1" data-component="RouterLink">
            <span class="btn bg-white shadow mx-1">π€οΈ λΈμ  κ΄λ¦¬</span>
          </a>
          <a href="/sections" class="my-1" data-component="RouterLink">
            <span class="btn bg-white shadow mx-1">π κ΅¬κ° κ΄λ¦¬</span>
          </a>
          <a href="#" class="my-1 logout">
            <span class="btn bg-white shadow mx-1">π λ‘κ·Έμμ</span>
          </a>
        ` : `
          <a href="/login" class="my-1" data-component="RouterLink">
            <span class="btn bg-white shadow mx-1">π€ λ‘κ·ΈμΈ</span>
          </a>
        `}
      </nav>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'RouterLink') {
      return new RouterLink(el);
    }
  }

  protected setEvent() {
    this.addEvent('click', '.logout', (event: Event) => {
      event.preventDefault();
      alert('λ‘κ·Έμμ λμμ΅λλ€.');
      router.push('/login');
      authStore.dispatch(SIGN_OUT);
    })
  }
}