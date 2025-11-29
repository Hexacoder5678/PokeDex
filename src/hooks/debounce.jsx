function useDebounce(cb,delay=2000){
    let timerid;
    return(...args)=>{
        clearImmediate(timerid);
        timerid=setTimeout(() => {
            cb(...args);
        }, delay);
    }
}
export default useDebounce;