import {Component} from "~_core/Component";
import {YoutubeClipItem} from "~domain";

export enum VideoClipType {
  SEARCH = 'SEARCH',
  CONTENT = 'CONTENT',
}

interface VideoClipProps {
  type: VideoClipType;
  item: YoutubeClipItem;
}

function dateformat(date: Date | string) {
  const temp = new Date(date);
  return `${temp.getFullYear()}년 ${temp.getMonth() + 1}월 ${temp.getDate()}일`;
}

export class VideoClip extends Component<{}, VideoClipProps> {

  private get footer () {
    const { type } = this.$props;
    return type === VideoClipType.SEARCH ? `
      <div class="d-flex justify-end">
        <button class="btn">⬇️ 저장</button>
      </div>
    ` : `
      <div>
        <span class="opacity-hover">✅</span>
        <span class="opacity-hover">👍</span>
        <span class="opacity-hover">💬</span>
        <span class="opacity-hover">🗑️</span>
      </div>
    `;
  }

  protected template(): string {
    const { id, snippet } = this.$props.item;
    const { videoId } = id;
    const { title, channelId, channelTitle, publishedAt } = snippet;
    return `
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          allowfullscreen
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3>${title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/${channelId}"
            target="_blank"
            class="channel-name mt-1"
          >
            ${channelTitle}
          </a>
          <div class="meta">
            <p>${dateformat(publishedAt)}</p>
          </div>
          ${this.footer}
        </div>
      </div>
    `;
  }
}