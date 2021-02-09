export function sortPosts() {
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