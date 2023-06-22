const mainBtn = document.getElementById('main-button')
const saveBtn = document.getElementById('save')
const titleInput = document.getElementById('title-input')
const authorInput = document.getElementById('author-input')
const category = document.getElementById('category')

const booksPanel = document.getElementById('books-panel')
const bookList = JSON.parse(localStorage.getItem('books')) || []

displayBooks(bookList)

saveBtn.addEventListener('click', function() {
	const title = titleInput.value;
	const author = authorInput.value;
	const selectedCategory = category.value

	if (title !== '' || author !== '') {
		const book = {
			title: title,
			author: author,
			category: selectedCategory
		}

		bookList.push(book)
		localStorage.setItem('books', JSON.stringify(bookList))
		displayBooks(bookList)
		titleInput.value = ''
		authorInput.value = ''
		category.value = ''
	}
})
function displayBooks(books) {
	booksPanel.innerHTML = ''

	books.forEach(book => {
		const bookCard = document.createElement('div')
		bookCard.classList.add('book-card')

		const title = document.createElement('h3')
		title.textContent = book.title
		const author = document.createElement('p')
		author.textContent = `Author: ${book.author}`

		const category = document.createElement ('fieldset')
		category.textContent = book.category
		// category.classList.add('category')

		if (book.category.trim() !== '') {
			category.classList.add(book.category.toLowerCase().replace(/\s+/g, '-'));
		}

		const deleteBtn = document.createElement('button')
		deleteBtn.classList.add('deleteBtn')

		bookCard.appendChild(title)
		bookCard.appendChild(author)
		bookCard.appendChild(category)
		bookCard.appendChild(deleteBtn)
		booksPanel.appendChild(bookCard)
	});
}


const closeBtn = document.getElementById('close')
closeBtn.addEventListener('click', () => {
	dialog.close();
})


// filter books by category
// delete card