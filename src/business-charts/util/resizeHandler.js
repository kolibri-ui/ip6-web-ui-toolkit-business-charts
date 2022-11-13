export {resizeHandler}

const resizeHandler = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.target.handleResize)
            entry.target.handleResize(entry);
    }
})