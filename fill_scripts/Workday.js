// do polling
console.log('loaded workday')

p.education.forEach(education => {
    
});

// Country selector

async function fillCountry() {
    let countryButton = document.querySelectorAll('[aria-label*="Country"]')[0];
    if (countryButton) {
        countryButton.click()
        await new Promise((resolve) => setTimeout(resolve, 2000));
        let dropDown = document.querySelectorAll('[tabindex="-1"]');
        dropDown = dropDown[dropDown.length - 1];
        console.log('dd', dropDown);
        let countryDivs = dropDown.getElementsByTagName('div')
        return countryDivs;
    } else {
        console.log('Country not found on this workday page')
    }
}

setTimeout(() => {
    (async () => {
        cl = await fillCountry();
        if (cl) {
            // Convert to an array so .forEach() works reliably:
            Array.from(cl).forEach(countryDiv => {
                if (countryDiv.textContent === 'Canada') {
                    countryDiv.parentElement.click();
                }
            });
        }
    })()
}, 5000);

async function fillProvince() {
    let provinceButton = document.querySelectorAll('[data-automation-id*="countryRegion"]')[0];
    if (provinceButton) {
        provinceButton.click()
        await new Promise((resolve) => setTimeout(resolve, 2000));
        let dropDown = document.querySelectorAll('[tabindex="-1"]');
        dropDown = dropDown[dropDown.length - 1];
        console.log('dd', dropDown);
        let countryDivs = dropDown.getElementsByTagName('div')
        return countryDivs;
    } else {
        console.log('Province not found on this workday page')
    }
}

setTimeout(() => {
    (async () => {
        cl = await fillProvince();
        if (cl) {
            // Convert to an array so .forEach() works reliably:
            Array.from(cl).forEach(countryDiv => {
                if (countryDiv.textContent === 'Quebec') {
                    countryDiv.parentElement.click();
                }
            });
        }
    })()
}, 10000);


// For the popup selector, it's always the last element after clicking the button
// document.querySelectorAll('[tabindex="-1"]');






