class AddNoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _show = true;
  _submitNote = 'submit';
  _addNote = 'addNote';

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

          border-radius: 10px;
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

        h3{
          font-size: x-large;
          margin: 0;
        }

        h3,input, textarea, button{
          font-family: monospace;
        }

        input, textarea, button{
          font-size: 16px;
          padding: 10px;
          font-family: monospace;
          width: -webkit-fill-available;
        }

        button{
          color: #fff;
          background-color: var(--color-black);
          
          transition: all 150ms ease-in;
        }

        .validation-message {
          margin-block-start: 0.5rem;
          color: red;
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
  connectedCallback() {
    this._shadowRoot
      .querySelector('form')
      .addEventListener('submit', (event) => this._onFormSubmit(event, this));
    this.addEventListener(this._submitNote, this._onNoteFormSubmit);

    /* Validation */
    this._shadowRoot
      .querySelector('form input')
      .addEventListener('change', this._customValidationInputHandler);
    this._shadowRoot
      .querySelector('form textarea')
      .addEventListener('change', this._customValidationInputHandler);

    this._shadowRoot
      .querySelector('form input')
      .addEventListener('invalid', this._customValidationInputHandler);
    this._shadowRoot
      .querySelector('form textarea')
      .addEventListener('invalid', this._customValidationInputHandler);

    this._shadowRoot
      .querySelector('form input')
      .addEventListener('blur', this._validateFieldHandler);
    this._shadowRoot
      .querySelector('form textarea')
      .addEventListener('blur', this._validateFieldHandler);
  }
  disconnectedCallback() {
    this._shadowRoot
      .querySelector('form')
      .removeEventListener('submit', (event) => this._onFormSubmit(event, this));
    this.removeEventListener(this._submitNote, this._onNoteFormSubmit);

    /* Validation */
    this._shadowRoot
      .querySelector('form input')
      .removeEventListener('change', this._customValidationInputHandler);
    this._shadowRoot
      .querySelector('form textarea')
      .removeEventListener('change', this._customValidationInputHandler);

    this._shadowRoot
      .querySelector('form input')
      .removeEventListener('invalid', this._customValidationInputHandler);
    this._shadowRoot
      .querySelector('form textarea')
      .removeEventListener('invalid', this._customValidationInputHandler);

    this._shadowRoot
      .querySelector('form input')
      .removeEventListener('blur', this._validateFieldHandler);
    this._shadowRoot
      .querySelector('form textarea')
      .removeEventListener('blur', this._validateFieldHandler);
  }

  _onFormSubmit(event, searchBarInstance) {
    searchBarInstance.dispatchEvent(new CustomEvent('submit'));
    event.preventDefault();
  }

  _onNoteFormSubmit() {
    const data = {
      title: this._shadowRoot.querySelector('input#title').value,
      body: this._shadowRoot.querySelector('textarea').value,
    };
    if (data.title === '' || data.body === '') return;

    this.dispatchEvent(
      new CustomEvent(this._addNote, {
        detail: { data },
        bubbles: true,
      }),
    );
  }

  _customValidationInputHandler = (event) => {
    event.target.setCustomValidity('');
    console.log(event.target.validity);
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.');
      return;
    }

    if (event.target.validity.rangeUnderflow) {
      event.target.setCustomValidity('Terlalu pendek, silahkan tambahkan karakter lagi');
      return;
    }

    if (event.target.validity.rangeOverflow) {
      event.target.setCustomValidity('Terlalu panjang, coba hapus beberapa karakter');
      return;
    }

    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity('Tidak boleh mengandung karakter spesial seperti dolar ($).');
      return;
    }
  };

  _validateFieldHandler = (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute('aria-describedby');
    const connectedValidationEl = connectedValidationId
      ? this._shadowRoot.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = '';
    }
  };

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="form-wrapper">
      <form id="note-form" >
        <h3>Add Note</h3>
        <div className="input-title-wrapper">
          <input 
          type="text" 
          placeholder="Note Title"
          required
          pattern="^[a-zA-Z0-9,. ]*$"
          maxlength="50"
          id="title"
          aria-describedby="titleValidation"
          autocomplete="off"

          />
          <p id="titleValidation" class="validation-message" aria-live="polite"></p>
        </div>
        <div className="input-body-wrapper">
          <textarea 
            id="desc-note" 
            cols="30" 
            rows="10" 
            placeholder="Body Note"
            required
            maxlength="255"
            autocomplete="off"
            aria-describedby="bodyValidation"
            ></textarea>
            <p id="bodyValidation" class="validation-message" aria-live="polite"></p>
        </div>

        <button type="submit">Submit</button>
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
