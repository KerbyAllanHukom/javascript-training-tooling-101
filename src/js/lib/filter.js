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