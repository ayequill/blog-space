let postArray = [];

// fetching posts API and saving it to an array
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((response) => response.json())
  .then((data) => {
    postArray = data.slice(0, 5); // slicing the array because they are over a hundred
    renderPosts();
  });

function renderPosts() {
  let html = "";
//   mapping over this html string and applying api object variables
  postArray.map((post) => {
    html += `<h3>${post.title}</h3>
                   <p>${post.body}</p>`;
  });

  document.getElementById("blogContainer").innerHTML = html;
}

document.getElementById("newPost").addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default browser behavior
  
//   getting input from user and storing is in an obj
  let postTitle = document.getElementById("postTitle").value;
  let postBody = document.getElementById("postBody").value;
  const data = { title: postTitle, body: postBody }; 

//   posting the new object created when user enters the properties needed
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
        // add the new obj to our array and rendering it with the updated values
      postArray.unshift(data);
      document.getElementById("postTitle").value = ''
      document.getElementById("postBody").value = ''
      renderPosts();
    });
});
