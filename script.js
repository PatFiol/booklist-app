const mainBtn = document.getElementById('main-button')
const saveBtn = document.getElementById('save-btn')
const titleInput = document.getElementById('title-input')
const authorInput = document.getElementById('author-input')
const category = document.getElementById('category')
const deleteBtn = document.getElementsByClassName('deleteBtn')
const booksPanel = document.getElementById('books-panel')
const bookCard = document.querySelectorAll('.book-card')
const bookList = JSON.parse(localStorage.getItem('books')) || []
const message = document.querySelector('.message')

displayBooks(bookList)
// Save Book entry
saveBtn.addEventListener('click', function () {
	const id = ''
	const title = titleInput.value
	const author = authorInput.value
	const selectedCategory = category.value

	if (title !== '' || author !== '') {
		let book = {
			title: title,
			author: author,
			category: selectedCategory,
		}
// Add book entry
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

	books.forEach((book) => {
		const bookCard = document.createElement('div')
		bookCard.classList.add('book-card')
		bookCard.setAttribute('data-category', book.category.toLowerCase().replace(/\s+/g, '-'))

		const title = document.createElement('h3')
		title.textContent = book.title
		const author = document.createElement('p')
		author.textContent = `Author: ${book.author}`

		const category = document.createElement('fieldset')
		category.textContent = book.category

		if (book.category.trim() !== '') {
			category.classList.add(book.category.toLowerCase().replace(/\s+/g, '-'))
		}

		const deleteBtn = document.createElement('button')
		deleteBtn.classList.add('deleteBtn')

		bookCard.appendChild(title)
		bookCard.appendChild(author)
		bookCard.appendChild(category)
		bookCard.appendChild(deleteBtn)
		booksPanel.appendChild(bookCard)

		// delete card
		deleteBtn.addEventListener('click', () => {
			bookCard.remove()

			const bookIndex = bookList.findIndex(
				(b) => b.title === book.title && b.author === book.author
			)
			if (bookIndex !== -1) {
				bookList.splice(bookIndex, 1)
				localStorage.setItem('books', JSON.stringify(bookList))
			}
		})
		message.style.display = 'none'
	})
}

// Close Dialog Pop-up
const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', () => {
	dialog.close()
})

// Filter by Categories
// JavaScript function to filter book cards based on the selected category
function filterBooksByCategory(category) {
  const bookCards = document.querySelectorAll(".book-card");

  bookCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    if (category === "all" || cardCategory === category) {
      card.classList.remove('hide');
    } else {
			card.classList.add('hide');
    }
  });
}

// Add event listeners to each category button
const categoryButtons = document.querySelectorAll(".category-title");

categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove "active" class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));

    // Add "active" class to the clicked button
    this.classList.add("active");

    // Get the category from the clicked button's class
    const category = this.classList[1];

    // Filter and display book cards based on the selected category
    filterBooksByCategory(category);
  });
});

// Message when there are no books
if (bookList.length == 0) {
	message.innerHTML = `
	Your Book List is empty.
	Add your first book from the top right corner...
	`
	message.style.display = "block"
}