import Utils from '../../utils.js';
class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _column = 3;
  _gutter = 16;
  _loading = true;
  _empty = false;

  static get observedAttributes() {
    return ['column', 'gutter', 'loading', 'empty'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
        }
        
        .note-list {
          display: grid;
          grid-template-columns: ${'1fr '.repeat(this.column)};
        
          gap: ${this.gutter}px;
        }

        .note-list-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }
        .info {
          text-align: center;
          font-size: 2rem;
          font-weight: 500;
        }
      `;
  }

  set column(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._column = value;
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._gutter = value;
  }

  get gutter() {
    return this._gutter;
  }
  set loading(value) {
    const newValue = value === 'true';
    this._loading = newValue;
  }

  get loading() {
    return this.newValue === 'true';
  }
  set empty(value) {
    const newValue = value === 'true';
    this._empty = newValue;
  }

  get empty() {
    return this.newValue === 'true';
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    if (this._loading) {
      this._shadowRoot.innerHTML += `
          <div class="note-list-info">
            <div class="info">Loading...</div>
          </div>
        `;
    } else if (this._empty) {
      this._shadowRoot.innerHTML += `
          <div class="note-list-info">
            <div class="info">Empty Note</div>
          </div>
        `;
    } else {
      this._shadowRoot.innerHTML += `
          <div class="note-list">
            <slot></slot>
          </div>
        `;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this.column = newValue;
        break;
      case 'gutter':
        this.gutter = newValue;
        break;
      case 'loading':
        this.loading = newValue;
        break;
      case 'empty':
        this.empty = newValue;
        break;
    }

    this.render();
  }
}

customElements.define('note-list', NoteList);
