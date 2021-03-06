import {Component} from "@/_core";
import {AuthRequest} from "subway-domain";
import {parseFormData} from "@/utils";
import {authStore, SIGN_IN} from "@/store";
import {router, RouterLink} from "@/router";

import '../assets/css/pages/auth.css';

export class LoginPage extends Component {
  protected template(): string {
    return `
      <div class="wrapper p-10 bg-white auth">
        <div class="heading">
          <h2>ππΌ λ‘κ·ΈμΈ</h2>
        </div>
        <form name="login" class="form">
          <div class="input-control">
            <label for="email" class="input-label" hidden>μ΄λ©μΌ</label>
            <input
              type="email"
              id="email"
              name="email"
              class="input-field"
              placeholder="μ΄λ©μΌ"
              required
            />
          </div>
          <div class="input-control">
            <label for="password" class="input-label" hidden
              >λΉλ°λ²νΈ</label
            >
            <input
              type="password"
              id="password"
              name="password"
              class="input-field"
              placeholder="λΉλ°λ²νΈ"
            />
          </div>
          <div class="input-control w-100">
            <button
              type="submit"
              class="input-submit w-100 bg-cyan-300"
            >
              νμΈ
            </button>
          </div>
          <p class="text-gray-700 pl-2">
            μμ§ νμμ΄ μλμ κ°μ?
            <a href="/signup" data-component="RouterLink">νμκ°μ</a>
          </p>
        </form>
      </div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'RouterLink') {
      return new RouterLink(el);
    }
  }

  protected setEvent() {
    this.addEvent('submit', 'form', async (event: Event) => {
      event.preventDefault();

      const request = parseFormData<AuthRequest>(event.target as HTMLFormElement);
      try {
        await authStore.dispatch(SIGN_IN, request);
        alert('λ‘κ·ΈμΈμ΄ μλ£λμμ΅λλ€.');
        router.push('/stations');
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    });
  }
}
