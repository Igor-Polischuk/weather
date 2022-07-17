const loader = {
    loading: false,
    showLoader: () => {
        const loaderBlock = document.querySelector('.loader');
        if (loader.loading) {
            loaderBlock.classList.remove('active');
            document.body.classList.remove('no-scroll');
        } else {
            loaderBlock.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }
};

export {
    loader
};