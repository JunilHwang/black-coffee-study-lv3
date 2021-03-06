import {Component} from "~@core";

interface HeaderProps {
  modalOpen: () => void;
}

export class Header extends Component<{}, HeaderProps> {
  public template(): string {
    return `
      <h1 class="text-center font-bold">π©π»βπ» λλ§μ μ νλΈ κ°μμ€ π¨π»βπ»</h1>
      <nav class="d-flex justify-center">
        <button class="btn bg-cyan-100 mx-1">ποΈ λ³Ό μμ</button>
        <button class="btn mx-1">β λ³Έ μμ</button>
        <button id="search-button" class="btn mx-1">
          π λμμ κ²μ
        </button>
      </nav>
    `;
  }

  public setEvent() {
    this.addEvent('click', '#search-button', () => {
      this.$props.modalOpen();
    })
  }
}
