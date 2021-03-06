class Book {
    constructor(title, author,isbn)
  { 
    this.title = title;
    this.author = author;
    this.isbn = isbn;
 }
}

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);

    }
    

    
    static deleteBook(el) {
        if(el.classList.contains('delete')){
            if(confirm('Are u sure bitch?'))
            el.parentElement.parentElement.remove();{}
        }
    }
    static ShowAlert( message , className) { 
        const div = document.createElement('div');
        div.className = `Alert alert-${className}`;
        div.id = 'alert'
        div.appendChild(document.createTextNode(message));
        const container =document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('#alert').remove(), 3000);


    }
        static clearFields () {
        document.querySelector('#title').value= '';
        document.querySelector('#author').value= '';
        document.querySelector('#isbn').value= '';
     }
}
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);


document.querySelector('#book-form').addEventListener('submit',(e) =>
 {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if((title === '' || isbn === '' || author === '')&& !(document.querySelector('#alert'))) {
        UI.ShowAlert('Doldur kizdirma', 'warning')
        
        
    }
    else if (!(title === '' || isbn === '' || author === '')&& !(document.querySelector('#alert'))){
        const book = new Book(title, author, isbn);
        UI.addBookToList(book); 
        Store.addBook(book);
        UI.ShowAlert('Yola gelecen aferin', 'success');
        UI.clearFields();
      
        

       
    }
});
document.querySelector('#book-list').addEventListener('click', (e) => {
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
     
    UI.deleteBook(e.target);
    if (!(document.querySelector('#alert')))
    {UI.ShowAlert('Yazik ke??ke silmeseydin', 'success');}
})
