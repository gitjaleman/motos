const locationPage = (page) =>{
    page==null?location.reload():location.href = page;
}

class APIHandler {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}
	async fetchData(endpoint, formData, callback) {
		const urlSearchParams = new URLSearchParams(formData);
		const response = await fetch(`${this.apiUrl}${endpoint}?${urlSearchParams.toString()}`);
		const data = await response.json();
		callback(data);
	}
	async postData(endpoint, formData, callback) {
		const response = await fetch(`${this.apiUrl}${endpoint}`, {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		callback(data);
	}
	async putData(endpoint, formData, callback) {
		const response = await fetch(`${this.apiUrl}${endpoint}`, {
			method: 'PUT',
			body: formData
		});
		const data = await response.json();
		callback(data);
	}
	async deleteData(endpoint, callback) {
		const response = await fetch(`${this.apiUrl}${endpoint}`, {
			method: 'DELETE'
		});
		const data = await response.json();
		callback(data);
	}
}
const apiHandler = new APIHandler('http://localhost/server/PRUEBAPHP/API/');

class FormManager {
    constructor(inputIds) {
      this.inputs = inputIds.map(id => document.getElementById(id));
    }
    getFormData() {
      const formData = new FormData();
      this.inputs.forEach(input => {
        if (input.type === 'file') {
            formData.append(input.name, input.files[0]);
        } else {
            formData.append(input.name, input.value);
        }
      });
      return formData;
    }
    clearForm() {
      this.inputs.forEach(input => {
        if (input.type === 'file') {
          input.value = null;
        } else {
          input.value = '';
        }
      });
    }
}

const sessionDestroy = () =>{
	sessionStorage.clear();
	locationPage('login');
}

const sessionActive = () =>{
	let session = sessionStorage.getItem("session");
	session=='active'?null:sessionDestroy();
}

const sessionOff  = () =>{
	sessionDestroy();
	locationPage(null);
} 