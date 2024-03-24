class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      
      div {
        // background-color: #fff;
        margin: 24px 20px;
        // position: fixed;
        // bottom: 0;
        // width: 100%;
      }
      div p{
        text-align : center;
        margin: 0;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    const year = new Date().getFullYear();
    this._shadowRoot.innerHTML += `      
      <div>
        <p>
          Notes App &copy; ${year}
        </p>
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
