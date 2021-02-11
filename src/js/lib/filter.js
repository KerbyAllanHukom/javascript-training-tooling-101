export function filterPosts() {
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

export function filterA() {
    console.log(1);
}

export function filterB() {
    console.log(2);
}

export function filterC() {
    console.log(3);
}

export default {filterA, filterB, filterC, filterPosts}
