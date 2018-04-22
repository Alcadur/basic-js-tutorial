const breadcrumbsContainer = document.querySelector('.breadcrumb');
const breadcrumbs = breadcrumbsContainer.querySelectorAll('.breadcrumb li');
toArray(breadcrumbs).forEach((li) => li.classList.add('future'));

function toArray(obj) {
    return Array.prototype.slice.call(obj);
}

function bindRevealStateEvents() {
    toArray(breadcrumbs).forEach((li) => {
        const type = li.dataset.type;

        if(type) {
            Reveal.addEventListener(type, markAsActiveBreadcrumb);
        }
    });
}

Reveal.addEventListener('var', () => {
    breadcrumbsContainer.querySelector('.var').classList.remove('inactive');
    breadcrumbsContainer.querySelector('.const').classList.add('inactive');
    breadcrumbsContainer.querySelector('.let').classList.add('inactive');
});
Reveal.addEventListener('const', () => {
    breadcrumbsContainer.querySelector('.var').classList.add('inactive');
    breadcrumbsContainer.querySelector('.const').classList.remove('inactive');
    breadcrumbsContainer.querySelector('.let').classList.add('inactive');
});
Reveal.addEventListener('let', () => {
    breadcrumbsContainer.querySelector('.var').classList.add('inactive');
    breadcrumbsContainer.querySelector('.const').classList.add('inactive');
    breadcrumbsContainer.querySelector('.let').classList.remove('inactive');
});
Reveal.addEventListener('varLetConst', () => {
    breadcrumbsContainer.querySelector('.var').classList.remove('inactive');
    breadcrumbsContainer.querySelector('.const').classList.remove('inactive');
    breadcrumbsContainer.querySelector('.let').classList.remove('inactive');
});


bindRevealStateEvents();

function markAsActiveBreadcrumb (event) {
    const active = document.querySelector(`[data-type="${event.type}"]`);
    toggleClassForAllSiblingsInDirection(active, -1);
    toggleClassForAllSiblingsInDirection(active, 1);
    active.classList.remove('future');
    active.classList.remove('past');
    active.classList.add('active');
    breadcrumbsContainer.dataset.active = event.type;
    const activeWidth = getComputedStyle(active).width ;
    breadcrumbsContainer.querySelector('.selector').style.fontSize = activeWidth;
}

/**
 * @param element
 * @param direction move direction -1 = before current element; 1 = after current element
 */
function toggleClassForAllSiblingsInDirection(element, direction) {
    let sibling = element.previousElementSibling;
    let classToAdd = 'past';
    if(direction === 1) {
        sibling = element.nextElementSibling;
        classToAdd = 'future';
    }

    if(!sibling) {
        return;
    }

    sibling.classList.remove('active');
    sibling.classList.remove('future');
    sibling.classList.remove('past');

    if(!sibling.classList.contains('selector')) {
        sibling.classList.add(classToAdd);
    }

    toggleClassForAllSiblingsInDirection(sibling, direction);
}