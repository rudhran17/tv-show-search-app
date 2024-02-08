const searchBtn = document.querySelector('#searchButton');
const clearBtn = document.querySelector('#clearButton');
const inputField = document.querySelector('#searchBox');
let mainBootstrapContainer = document.querySelector('.container');
let bootstrapRow = document.querySelector('.row');
bootstrapRow.classList.add('align-items-stretch')
searchBtn.addEventListener('click',(evt)=>{
      evt.preventDefault();
      if(inputField.value===''){
        inputField.placeholder = 'Please enter a name'
      }
      else{
        let userSearch = inputField.value;
        fetch(`https://api.tvmaze.com/search/shows?q=${userSearch}`)
        .then(response => response.json())
        .then(response => {
          if(response.length>0){
            const resultLength = response.length;
            let genre = '';
            let language = '';
            let imgSource = '';
            let showName = '';
            for(let i = 0;i<resultLength;i++){
              showName = response[i].show.name;
              if(response[i].show.genres.length===0){
                genre = '-';
              }else{
                genre = response[i].show.genres[0];
              }
              language = response[i].show.language;
              if(response[i].show.image){
                imgSource = response[i].show.image.medium;
              }
              else{
                imgSource = 'https://images.unsplash.com/photo-1636110291887-a1a76d79ccaa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              const columnDiv = document.createElement('div');
              columnDiv.classList.add('col-md-4');
              columnDiv.classList.add('col-lg-3');
              columnDiv.classList.add('mt-5');
              const cardDiv = document.createElement('div');
              cardDiv.classList.add('card');
              cardDiv.classList.add('mt-5');
              cardDiv.classList.add('h-100');
              cardDiv.classList.add('border-danger-subtle');
              cardDiv.classList.add('border-2');
              cardDiv.classList.add('text-bg-dark');
              const imgTag = document.createElement('img');
              imgTag.classList.add('img-fluid');
              const cardBodyDiv = document.createElement('div');
              cardBodyDiv.classList.add('card-body');
              const showTitle = document.createElement('p');
              showTitle.classList.add('card-text');
              const showGenre = document.createElement('p');
              showGenre.classList.add('card-text');
              const showLanguage = document.createElement('p');
              showLanguage.classList.add('card-text');
              showTitle.innerText = showName;
              showGenre.innerText = genre;
              showLanguage.innerText = language;
              imgTag.src = imgSource;
              columnDiv.append(cardDiv);
              cardDiv.append(imgTag);
              cardDiv.append(cardBodyDiv);
              cardBodyDiv.append(showTitle);
              cardBodyDiv.append(showGenre);
              cardBodyDiv.append(showLanguage);
              bootstrapRow.append(columnDiv);
              mainBootstrapContainer.append(bootstrapRow);
              searchBtn.disabled = true;
              inputField.disabled = true;
            }
          }
          else{
            const h1 = document.createElement('h1');
            h1.innerText = '"Sorry, That did not work :)"'
            h1.style.color = 'white';
            mainBootstrapContainer.append(h1);
            searchBtn.disabled = true;
            inputField.disabled = true;
          }
  })
    .catch(err => console.log(err));
      }
})
clearBtn.addEventListener('click',(evt)=>{
  mainBootstrapContainer.remove();
  searchBtn.disabled = false;
  inputField.disabled = false;

})