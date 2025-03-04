export const changePageEvent = new CustomEvent('customChangePage',{
    detail:{
        page:window.location.pathname
    }
})
