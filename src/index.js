let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } 
    else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener('submit', e => {
    e.preventDefault()
    postToy(e.target.name.value, e.target.image.value)
  })
});

const toyCollection = document.querySelector('#toy-collection')

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(data => renderToys(data))

function renderToys(toys) {
  const div = document.createElement('div')
  const toyCollect = document.getElementById('toy-collection')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  
  div.className = 'card'
  btn.className = 'like-btn'
  img.className = 'toy-avatar'
  btn.textContent = 'like'
  h2.textContent = toys.name
  img.src = toys.image
  p.textContent = toys.likes + ' Likes ❤️'
  btn.setAttribute('id', `${toys.id}`)
  toyCollect.appendChild(div)
  div.append(img, p, btn)
}

function postToy(name, url){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(newToy => renderToys(newToy))
}

toyCollection.addEventListener('click', (e) => {
  if (e.target.className === 'like-btn') {
  let currLikes = parseInt(e.target.previousElementSibling.innerText)
  let newLikes = currLikes +  1
  e.target.previousElementSibling.innerText = newLikes + ' likes'
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
     method: 'PATCH',
        headers:
          {
      'Content-Type': 'application/json',
      Accept: 'application/json'
          },
        body: JSON.stringify({
         likes: newLikes
            })
      })
  }
})




// function addLikes(likes){
// }

    //(liked) => {
    // likebtn.forEach(liked)
//     fetch('http://localhost:3000/toys', {
//       method: 'PATCH',
//       headers:
//       {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//       },
//       body: JSON.stringify({
//         'likes': likes
//       })
//     })
//     })
// }


// can be used to substitute verbose declarations in render toys
// grab the names, img, etc from the json object where its labeled
// forEach or  return map.(`<div class="card"> 
//   <h2>`${toy.name}`</h2>
//   <img src="`${toy.image}`" class="toy-avatar" />
//   <p>4 interpolate</p>
//   <button class="like-btn" id="`${toy.id}">Like ❤️</button>
// </div>`)



// const configObj = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   },

//   body: JSON.stringify()
// }

// fetch('http://localhost:3000/toys', configObj)
// .then(resp => resp.json())
// .then(addData => addData.forEach(newToy))



//   const inputs = document.getElementsByClassName('input-text')
//   const form = document.querySelector('submit')
//   form.addEventListener('submit', )
// }

