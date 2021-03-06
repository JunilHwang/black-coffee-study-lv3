import {addEvent} from "~@core";
import {router} from "~router";

export interface HeaderProps {
  openModal: () => void;
}

export const Header = ({ openModal }: HeaderProps) => {

  addEvent('#search-button', 'click', () => {
    openModal();
  });

  return `
    <header class="my-4">
      <h2 class="text-center font-bold">π©π»βπ» λλ§μ μ νλΈ κ°μμ€ π¨π»βπ»</h2>
      <nav class="d-flex justify-center">
      
        <a href="/#!" class="btn ${router.path === '/' ? 'bg-cyan-100' : ''} mx-1">
          ποΈ λ³Ό μμ
        </a>
        
        <a href="/#!/viewed" class="btn ${router.path === '/viewed' ? 'bg-cyan-100' : ''} mx-1">
          β λ³Έ μμ
        </a>
        
        <a href="/#!/liked" class="btn ${router.path === '/liked' ? 'bg-cyan-100' : ''} mx-1">
          π μ’μμ ν μμ
        </a>
        
        <button id="search-button" class="btn mx-1">
          π λμμ κ²μ
        </button>
        
      </nav>
    </header>
  `;

}
