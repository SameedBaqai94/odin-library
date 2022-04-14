const Book = (title,author,pages)=>{
    let _title=title;
    let _author=author;
    let _pages=pages;
    let _read=false;

    const getTitle=()=>_title;
    const getAuthor=()=>_author;
    const getPages=()=>_pages;
    const getRead=()=>_read;

    return {getTitle,getAuthor,getPages,getRead}

}

const controller=()=>{
    let library=[];

    const addBook=(title,author,pages)=>{
        let book = Book(title,author,pages);
        return book;
    }

    const addToLibrary=(title,author,pages)=>{
        let book = addBook(title,author,pages);
        library.push(book);
    }

    const defaultBookAdded=()=>{
        const book1 = addBook('Sherlock Homes','Arthur Conan Doyle','500');
        const book2 = addBook('The Great Gatsby','F. Scott Fitzgerald','300');
        const book3 = addBook('To Kill a Mockingbird','Harper Lee','200');
        library.push(book1); library.push(book2);library.push(book3);
    }
    const getLibrary=()=>library;

    return {addToLibrary,getLibrary,defaultBookAdded}

}

const UI=(()=>{

    const addBookToUI=(lib)=>{
        const topContainer=document.getElementById('top-container');
        lib.forEach((book,index) => {
            const div=document.createElement('div');
            const h4 =document.createElement('h4');
            const author = document.createElement('p');
            const pages = document.createElement('p');
            const button = document.createElement('button');


            div.classList.add('top-box');

            h4.textContent=book.getTitle();
            div.appendChild(h4);

            author.textContent=book.getAuthor();
            author.classList.add('author');
            div.appendChild(author);

            pages.textContent=book.getPages();
            pages.classList.add('pages');
            div.appendChild(pages);

            button.textContent="Remove";
            button.classList.add('btn');
            button.setAttribute('id','remove');
            div.appendChild(button);

            topContainer.appendChild(div)
        });
    }

    const clearTopContainer=()=>{
        const topContainer=document.getElementById('top-container');
        topContainer.innerHTML="";
    }

    return ()=>{

        let _controller = controller();
        _controller.defaultBookAdded();

        addBookToUI(_controller.getLibrary());

        const submit=document.getElementById('submit');
        submit.addEventListener('click',()=>{
            const title=document.getElementById('title');
            const author=document.getElementById('author');
            const pages=document.getElementById('pages');

            _controller.addToLibrary(title.value,author.value,pages.value);
            clearTopContainer();
            addBookToUI(_controller.getLibrary());
        })
    }

})()

UI();