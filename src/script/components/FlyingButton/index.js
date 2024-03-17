class FlyingButton extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _clickEvent = 'click';


  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
        }

        button.flying-button{
          position: fixed;
          bottom: 25px;
          right: 25px;

          width: 50px;
          height: 50px;
          border-radius: 25px;
          border: none;

          color: #fff;
          background-color: var(--color-black);
          font-size: 1.5rem;

          transition: all 150ms ease-in;
        }

        button.flying-button:hover{
          background-color: rgb(100, 100, 100);
        }

        button.flying-button:active{

          background-color: rgb(75, 75, 75);

        }
      `;
  }

  connectedCallback() {
    // this._shadowRoot
    //   .querySelector('form')
    //   .addEventListener('submit', (event) => this._onFormSubmit(event, this));
    this.addEventListener(this._clickEvent, this._onSearchBarSubmit);
  }


  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <button class="flying-button">+</button>
      `;
  }
}

customElements.define('flying-button', FlyingButton);
