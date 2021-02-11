import { $ } from "./lib/helpers";
// import { sortPosts } from "./lib/filter";
// import { filterPosts } from "./lib/filter";

(() => {

const preloader = $('.preloader');
const postsList = $('.posts__list');
const selectSort = $('.posts__sort');
const selectFilter = $('.posts__filter');
const featuredList = $('.featured__posts');

const filteredPosts = [];

const posts = [];

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        posts.push(...data);
        filteredPosts.push(...data);
        preloader.classList.add('is-hidden');
        fetchPosts(posts, postsList);
    });

const featuredPosts = [];

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        featuredPosts.push(...data);
        const totalPosts = featuredPosts.length;
        const featuredPostsSliced = featuredPosts.slice(totalPosts - 5);
        fetchPosts(featuredPostsSliced, featuredList);
    });

const users = [];

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        users.push(...data);
        selectFilter.disabled = false;
        setUserOptions(users); 
    });
    
function fetchPosts(postsContent, container) {
    const postsFetched = postsContent.map(post => {
        return `
            <li class="posts__list-content">
                <img src="https://picsum.photos/300/300?random=${Math.floor(Math.random()*100)}">
                <a href="#${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>
                <p>${post.body}</p>
            </li>
        `;
    })
    .join("");
    container.innerHTML = postsFetched;
}

function setUserOptions() {
    const userOptions = users.map(user => {
        return `
            <option value="${user.id}">${user.name}</option>
        `;
    })
    .join("");
    selectFilter.insertAdjacentHTML('beforeend', userOptions);
}

function sortPosts() {
    selectSort.children[0].disabled = true;
    const sortOption = selectSort.value;
    switch (sortOption) {
        case 'ascPosts':
            filteredPosts.sort((a, b) => a.title > b.title ? 1 : -1);
            break;
        case 'descPosts':
            filteredPosts.sort((a, b) => a.title < b.title ? 1 : -1);
            break;
    }
    fetchPosts(filteredPosts);
}

function filterPosts() {
    filteredPosts = [...posts];
    const filterOption = this.selectedOptions[0].value;
    const sortValue = selectSort.value;
    if (filterOption !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.userId === parseInt(filterOption));
    }
    if (sortValue !== 'none') {
        sortPosts();
    }
    fetchPosts(filteredPosts);
}

selectSort.addEventListener('change', sortPosts);
selectFilter.addEventListener('change', filterPosts);

})();
