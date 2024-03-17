class AddNoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _show = false;

  static get observedAttributes() {
    return ['show'];
  }

  set show(value) {
    this._show = value;
  }

  get show() {
    return this._show;
  }

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

        .form-wrapper{
          display: ${this.show ? 'block' : 'none'};
          padding: 20px;
          width: 50%;

          border-radius: 16px;
          background-color: #fff;
          box-shadow:  5px 10px 20px #e1e1e3, -15px -15px 27px #ffffff;
          -webkit-box-shadow:  5px 10px 20px #e1e1e3, -15px -15px 27px #ffffff;
          border: 1px solid #4B4B4B;

          position: fixed;
          top: 50%;
          left: 50%;
          
          transform: translate(-50%, -50%);
        }

        

        form{
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 1rem;
        }

        input, textarea, button{
          font-size: 16px;
          padding: 10px;

        }

        button{
          color: #fff;
          background-color: var(--color-black);
          
          transition: all 150ms ease-in;
        }

        @media (max-width: 450px){
          .form-wrapper{
            width: 75%;
          }
        }

        @media (min-width: 450px){
          .form-wrapper{
            width: 60%;
          }
        }

        @media (min-width: 768px){
          .form-wrapper{
            width: 50%;
          }
        }
      `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="form-wrapper">
      <form id="note-form">
        <h3>Add Note</h3>
        <input type="text" placeholder="Note Title" />
        <textarea name="desc-note" id="desc-note" cols="30" rows="10" placeholder="Body Note"></textarea>
        <button>Submit</button>
      </form>
    </div>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'show':
        this.show = newValue;
        break;
    }

    this.render();
  }
}

customElements.define('note-form', AddNoteForm);
