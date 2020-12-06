export default function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
	// Tabs
	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabParentSelector);

	const hideTabContent = () => {
		tabsContent.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});

	};

	const showTabContent = (index = 0) => {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide');
		tabs[index].classList.add(activeClass);
	};

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((tab, index) => {
				if (target == tab) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});
}