class AppBar extends HTMLElement {
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
        width: 100%;
        
        color: var(--color-black);
        
        // box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
      }

      nav {
        padding: 24px 20px;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
      }

      .brand-name {
        margin: 0;
      
        font-size: 1.7em;
      }
      .navigation {
        margin-right : 50px;
      }
      .navigation ul{
        display : inline-block;
      }
      .navigation ul li{
        list-style-type: none;
      
      }

      .navigation ul li a{
        text-decoration:none;
        color: var(--color-black)
        padding: 3px 5px;
        font-size : 1.1rem;
        transition: all 400ms ease-in;
      }

      .navigation ul li a:hover{
        font-weight: 700;
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
    this._shadowRoot.innerHTML += `      
      <nav>
        <h1 class="brand-name">Notes App</h1>
        <div class="navigation">
          <ul>
            <li><a href="/index.html">Home</a></li>
          </ul>
          <ul>
            <li><a href="/archive.html">Archive</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
