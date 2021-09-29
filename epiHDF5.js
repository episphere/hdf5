console.log(`epiHDF5.js loaded ${Date()}`)

epiHDF5 = async function(){
    // dependencies
    await epiHDF5.require('pako','https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.4/pako.min.js')
    await epiHDF5.require('hdf5','https://cdn.jsdelivr.net/gh/usnistgov/jsfive@master/dist/hdf5.js')
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

epiHDF5.fetch = function(file_url='https://ndownloader.figshare.com/files/7024985',fun=console.log,filename='datafile.hdf5'){
  console.log(`loading ${file_url}`)
  fetch(file_url)
  .then(function(response) { 
    return response.arrayBuffer() 
  })
  .then(function(buffer) {
    var f = new hdf5.File(buffer, filename);
    // do something with f;
    // let g = f.get('group');
    // let d = f.get('group/dataset');
    // let v = d.value;
    // let a = d.attrs;
    fun(f)
  });
}

//example: epiHDF5.fetch('https://ndownloader.figshare.com/files/7024271',_=>{x=_;console.log('done')})

epiHDF5.loadData = function(fun=console.log,id='datafile'){ // upload input
  if(!document.getElementById(id)){
    var file_input = document.createElement('input')
    file_input.type='file'
    document.body.appendChild(file_input)
  }else{
    var file_input = document.getElementById(id);
  }
  file_input.onchange = (event) => {
    //var file = file_input.files[0]; // only one file allowed
    var file = event.target.files[0]; // only one file allowed
    let datafilename = file.name;
    let reader = new FileReader();
    reader.onloadend = function(evt) { 
      let barr = evt.target.result;
      var f = new hdf5.File(barr, datafilename);
      // do something with f...
      fun(f)
    }
    reader.readAsArrayBuffer(file);
    //file_input.value = "";
  }
} 

epiHDF5.help = function(){
  window.open('https://github.com/usnistgov/jsfive')
}

epiHDF5()