console.log(`epiHDF5.js loaded ${Date()}`)




epiHDF5 = async function(){
    // dependencies
    await epiHDF5.require('hdf5')

}

epiHDF5.loadScript = async function(url='https://cdn.jsdelivr.net/gh/usnistgov/jsfive@master/dist/hdf5.js'){
    return new Promise((resolve, reject) => {
        let s = document.createElement('script')
        s.src=url
        s.onload=resolve
        document.head.appendChild(s)
        console.log(`loading ${url}`)
    })
}

epiHDF5.require = async function(v,url){
    if(typeof(window[v])=='undefined'){
      await epiHDF5.loadScript(url)
    }
    return window[v]
}

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});




if(typeof(hdf5)){

}