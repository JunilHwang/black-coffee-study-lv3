import {Component} from "~_core/Component";
import {RecentSearches} from "~components/RecentSearches";
import {VideoClip, VideoClipType} from "~components/VideoClip";
import {youtubeService} from "~services/youtubeService";
import {YoutubeClipItem} from "~domain";

interface State {
  items: YoutubeClipItem[];
  recentSearchKeys: string[];
}

export class YoutubeSearchModal extends Component<State> {

  public setup() {
    this.$state = {
      items: [],
      recentSearchKeys: youtubeService.getRecentSearchKeys(),
    }
  }

  protected template(): string {
    const { items } = this.$state;

    return `
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔎 유튜브 검색</h2>
        </header>
        <form class="d-flex searchFrm">
          <input type="text" name="q" class="w-100 mr-2 pl-2" placeholder="검색" />
          <button type="submit" class="btn bg-cyan-500">검색</button>
        </form>
        <section class="mt-2" data-component="RecentSearches"></section>
        <section>
          <div class="d-flex justify-end text-gray-700">
            저장된 영상 갯수: ${items.length}개
          </div>
          <section class="video-wrapper">
            ${items.map((item, key) => `
              <article class="clip" data-component="VideoClip" data-key="${key}"></article>
            `).join('')}
            ${items.length === 0 ? '유튜브 동영상을 검색해주세요' : ''}
          </section>
        </section>
      </div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'RecentSearches') {
      return new RecentSearches(el, {
        items: this.$state.recentSearchKeys,
        search: q => this.search(q),
      });
    }
    if (componentName === 'VideoClip') {
      const itemKey = Number(el.dataset.key)
      return new VideoClip(el, {
        type: VideoClipType.SEARCH,
        item: this.$state.items[itemKey],
      });
    }
  }

  public open () {
    this.$target.classList.add('open');
  }

  public close () {
    this.$target.classList.remove('open');
  }

  public async search (q: string) {
    this.$state.items = await youtubeService.search(q);
    this.$state.recentSearchKeys = youtubeService.getRecentSearchKeys();
  }

  protected setEvent() {
    this.addEvent('click', '.modal-close', () => this.close());

    this.addEvent('submit', '.searchFrm', async (event: Event) => {
      event.preventDefault();
      const { q } = event.target as HTMLFormElement;
      this.search(q.value);
    })
  }
}
