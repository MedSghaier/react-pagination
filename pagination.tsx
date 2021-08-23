import React, {useState, useEffect} from 'react'


const Pagination = (props) => {
    const {
        canNextPage,
        canPreviousPage,
        gotoPage,
        nextPage,
        pageCount,
        previousPage,
        pageIndex,
    } = props;

    const [pagesPagination, setPagesPagination] = useState([])

    useEffect(() => {
        setPagesPagination(getPaginationPages(pageIndex, pageCount));
    }, [pageIndex, pageCount])

    const getPaginationPages = (pageIndex:number, pageCount:number) => {
        const paginationPages = [];
        let i;

        // First part
        if((pageIndex < pageCount) && (pageIndex > 0)){ paginationPages.push(1) }
        if((pageIndex < pageCount) && (pageIndex > 1)){ paginationPages.push('...') }

        // Dynamique part
        for (i = pageIndex+1; i <= pageIndex+3; i++){
            // Add list of pages
            if(i <= pageCount){ paginationPages.push(i) }
        }

        // Last part
        if(i+1 <= pageCount){ paginationPages.push('-1') }
        if(i <= pageCount){ paginationPages.push(pageCount) }
        return (paginationPages.map(val => {
            return ((val == -1)
                        ? <span key={val} className={paginationStyle.pagination.navItem}>{'...'}</span>
                        : (<button key={val}
                               className={((val-1) === pageIndex) ? paginationStyle.pagination.navItemActive : paginationStyle.pagination.navItem}
                               onClick={() => gotoPage(val-1)}>{val}
                           </button>)
                    )
                }));
    }

    return (
        <nav className={paginationStyle.pagination.nav} aria-label="Pagination">
            <button className={`${paginationStyle.pagination.navItem} ${' '} ${paginationStyle.pagination.navItemFirst}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}><BsChevronDoubleLeft /></button>
            <button className={paginationStyle.pagination.navItem} onClick={() => previousPage()} disabled={!canPreviousPage}><BsChevronLeft /></button>
            { pagesPagination }
            <button className={paginationStyle.pagination.navItem} onClick={() => nextPage()} disabled={!canNextPage}><BsChevronRight/></button>
            <button className={`${paginationStyle.pagination.navItem} ${' '} ${paginationStyle.pagination.navItemLast}`} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><BsChevronDoubleRight/></button>
        </nav>
    )
}
export default Pagination
