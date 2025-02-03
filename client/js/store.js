const FILE_INFORMATION = [];

const addFileInfo =(data)=>{
    FILE_INFORMATION.push(data);
}

const removeFileInfo =(index)=>{
    FILE_INFORMATION.splice(index,1);
}

const clearFileInfo =()=>{
    FILE_INFORMATION.splice(0,FILE_INFORMATION.length);
}

const updateFileInfo =(index, data)=>{
    FILE_INFORMATION[index] = data;
}

export {
    FILE_INFORMATION,
    addFileInfo,
    removeFileInfo,
    clearFileInfo,
    updateFileInfo
}