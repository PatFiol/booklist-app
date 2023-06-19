const mainBtn = document.getElementById('main-button')
const saveBtn = document.getElementById('save')
const titleInput = document.getElementById('title-input')
const authorInput = document.getElementById('author-input')
const selectCategory = document.getElementById('category')

const booksPanel = document.getElementById('books-panel')
const bookList = JSON.parse(localStorage.getItem('books')) || []

displayBooks(bookList)

let books = []
saveBtn.addEventListener('click', function() {
	const title = titleInput.value.trim()
	const author = authorInput.value.trim()
	// const category = selectCategory.value.trim()

	if (title !== '' && author !== '') {
		const book = {
			title: title,
			author: author,
			// category: category
		}

		bookList.push(book)
		localStorage.setItem('books', JSON.stringify(bookList))
		displayBooks(bookList)

		titleInput.value = ''
		authorInput.value = ''
		// selectCategory.value = ''
	}
})


function displayBooks(books) {
	bookList.innerHTML = ''

	books.forEach(book => {
		const bookCard = document.createElement('div')
		bookCard.classList.add('book-card')

		const title = document.createElement('h3')
		title.textContent = book.title
		const author = document.createElement('p')
		author.textContent = `Author: ${book.author}`

		bookCard.appendChild(title)
		bookCard.appendChild(author)
		booksPanel.appendChild(bookCard)


	});
}


const closeBtn = document.getElementById('close')
  closeBtn.addEventListener('click', () => {
    dialog.close();
	})


	console.log('todo funciona')