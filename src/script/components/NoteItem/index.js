class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set note(value) {
    this._note = value;

    // Render ulang
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
          border-radius: 8px;
                  
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.6);
          box-shadow: 1px solid #E2E2E2;
          overflow: hidden;
        }
        .note-item{
          padding: 16px 24px;
        }
  
        .note-item__note-header .note-item__note-header__title h2 {
          font-weight: 600;
          font-size: 21px;
          margin-bottom: 10px;
          color: var(--color-black);
        }
        .note-item__note-header .note-item__note-header__date p {
         
          font-size: 14px;
          font-weight: lighter;
          color: #7C7C7C;
          margin: 0;

        }
  
        .note-item__note-body__description p {
          display: -webkit-box;
          margin-top: 10px;
          
          overflow: hidden;
          white-space: pre-line;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5; /* number of lines to show */
        } 

      `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    const noteDate = new Date(this._note.createdAt).toLocaleString('en-UK');

    this._shadowRoot.innerHTML += `      
        <div class="card note-item">
          <div class="note-item__note-header">
            <div class="note-item__note-header__title">
              <h2>${this._note.title}</h2>
            </div>
            <div class="note-item__note-header__date">
              <p>${noteDate}
              </p>
            </div>
          </div>
          <div class="note-item__note-body">
            <div class="note-item__note-body__description">
              <p>${this._note.body}</p>
            </div>
          </div>
        </div>
      `;
  }
}

customElements.define('note-item', NoteItem);
