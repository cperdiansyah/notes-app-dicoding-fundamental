const API_URL = 'https://notes-api.dicoding.dev/v2';
class ApiNotes {
  static async api(url, method = 'GET', bodyRequest) {
    /* 
    method = 'DELETE', "GET", "POST", "PUT"
    */

    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest),
    })
      .then((res) => res.json())
      .then((response) => response)
      .catch((err) => new Error(err));
  }

  static async getNotes() {
    const data = await ApiNotes.api(`${API_URL}/notes`);

    return data;
  }

  static async getArchivedNotes() {
    const data = await ApiNotes.api(`${API_URL}/notes/archived`);

    return data;
  }

  static async getNote(id) {
    const data = await ApiNotes.api(`${API_URL}/notes/${id}`);
    return data;
  }

  static async addNote(note) {
    const data = await ApiNotes.api(`${API_URL}/notes`, 'POST', note);
    return data;
  }

  static async archiveNote(id) {
    const data = await ApiNotes.api(`${API_URL}/notes/${id}/archive`, 'POST');
    return data;
  }
  static async unarchiveNote(id) {
    const data = await ApiNotes.api(`${API_URL}/notes/${id}/unarchive`, 'POST');
    return data;
  }

  static async deleteNote(id) {
    const data = await ApiNotes.api(`${API_URL}/notes/${id}`, 'DELETE');
    return data;
  }
}
export default ApiNotes;
